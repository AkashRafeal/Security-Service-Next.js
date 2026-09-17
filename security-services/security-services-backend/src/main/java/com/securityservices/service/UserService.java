package com.securityservices.service;

import com.securityservices.dto.CreateUserRequest;
import com.securityservices.dto.PasswordResetRequest;
import com.securityservices.dto.UpdateUserRequest;
import com.securityservices.dto.UserDto;
import com.securityservices.entity.Role;
import com.securityservices.entity.RoleType;
import com.securityservices.entity.User;
import com.securityservices.exception.DuplicateResourceException;
import com.securityservices.exception.ResourceNotFoundException;
import com.securityservices.repository.RoleRepository;
import com.securityservices.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuditLogService auditLogService;

    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map(AuthService::mapToDto)
                .collect(Collectors.toList());
    }

    public UserDto getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        return AuthService.mapToDto(user);
    }

    @Transactional
    public UserDto createUser(CreateUserRequest request, String performedBy) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new DuplicateResourceException("Username '" + request.getUsername() + "' is already taken");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("Email '" + request.getEmail() + "' is already registered");
        }

        Set<Role> roles = new HashSet<>();
        for (String roleName : request.getRoles()) {
            RoleType type = RoleType.valueOf(roleName.startsWith("ROLE_") ? roleName : "ROLE_" + roleName);
            Role role = roleRepository.findByName(type)
                    .orElseThrow(() -> new ResourceNotFoundException("Role not found: " + roleName));
            roles.add(role);
        }

        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .fullName(request.getFullName())
                .phone(request.getPhone())
                .isActive(true)
                .roles(roles)
                .build();

        User saved = userRepository.save(user);
        auditLogService.log("USER_CREATE", performedBy, "User", saved.getId(), "Created user " + saved.getUsername(), null);

        return AuthService.mapToDto(saved);
    }

    @Transactional
    public UserDto updateUser(Long id, UpdateUserRequest request, String performedBy) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        if (!user.getEmail().equalsIgnoreCase(request.getEmail()) && userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("Email '" + request.getEmail() + "' is already registered");
        }

        user.setEmail(request.getEmail());
        user.setFullName(request.getFullName());
        user.setPhone(request.getPhone());
        if (request.getIsActive() != null) {
            user.setIsActive(request.getIsActive());
        }

        if (request.getRoles() != null && !request.getRoles().isEmpty()) {
            Set<Role> roles = new HashSet<>();
            for (String roleName : request.getRoles()) {
                RoleType type = RoleType.valueOf(roleName.startsWith("ROLE_") ? roleName : "ROLE_" + roleName);
                Role role = roleRepository.findByName(type)
                        .orElseThrow(() -> new ResourceNotFoundException("Role not found: " + roleName));
                roles.add(role);
            }
            user.setRoles(roles);
        }

        User updated = userRepository.save(user);
        auditLogService.log("USER_UPDATE", performedBy, "User", updated.getId(), "Updated user " + updated.getUsername(), null);

        return AuthService.mapToDto(updated);
    }

    @Transactional
    public void toggleUserActive(Long id, String performedBy) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        user.setIsActive(!user.getIsActive());
        userRepository.save(user);
        auditLogService.log("USER_STATUS_TOGGLE", performedBy, "User", id, "Toggled status to " + user.getIsActive(), null);
    }

    @Transactional
    public void resetPassword(Long id, PasswordResetRequest request, String performedBy) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
        auditLogService.log("USER_PASSWORD_RESET", performedBy, "User", id, "Reset password for " + user.getUsername(), null);
    }

    @Transactional
    public void deleteUser(Long id, String performedBy) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        userRepository.delete(user);
        auditLogService.log("USER_DELETE", performedBy, "User", id, "Deleted user " + user.getUsername(), null);
    }
}
