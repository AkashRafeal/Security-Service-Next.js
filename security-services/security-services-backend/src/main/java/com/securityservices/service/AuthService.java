package com.securityservices.service;

import com.securityservices.dto.AuthResponse;
import com.securityservices.dto.LoginRequest;
import com.securityservices.dto.UserDto;
import com.securityservices.entity.User;
import com.securityservices.exception.BadRequestException;
import com.securityservices.repository.UserRepository;
import com.securityservices.security.JwtTokenProvider;
import com.securityservices.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Set;
import com.securityservices.dto.RegisterRequest;
import com.securityservices.entity.Role;
import com.securityservices.entity.RoleType;
import com.securityservices.repository.RoleRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuditLogService auditLogService;

    public AuthResponse register(RegisterRequest request, String ipAddress) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new BadRequestException("Username is already taken");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email address is already in use");
        }

        Role userRole = roleRepository.findByName(RoleType.ROLE_USER)
                .orElseGet(() -> roleRepository.save(Role.builder()
                        .name(RoleType.ROLE_USER)
                        .description("Standard Client / User Authority")
                        .build()));

        User user = User.builder()
                .username(request.getUsername().trim())
                .email(request.getEmail().trim().toLowerCase())
                .password(passwordEncoder.encode(request.getPassword()))
                .fullName(request.getFullName().trim())
                .phone(request.getPhone())
                .isActive(true)
                .roles(Set.of(userRole))
                .build();

        User savedUser = userRepository.save(user);

        auditLogService.log("USER_REGISTER", savedUser.getUsername(), "User", savedUser.getId(), "User account registered", ipAddress);

        return login(new LoginRequest(savedUser.getUsername(), request.getPassword()), ipAddress);
    }

    public AuthResponse login(LoginRequest request, String ipAddress) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);

        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        Set<String> roles = userPrincipal.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toSet());

        auditLogService.log("USER_LOGIN", userPrincipal.getUsername(), "User", userPrincipal.getId(), "User logged in successfully", ipAddress);

        return AuthResponse.builder()
                .token(jwt)
                .type("Bearer")
                .id(userPrincipal.getId())
                .username(userPrincipal.getUsername())
                .email(userPrincipal.getEmail())
                .fullName(userPrincipal.getFullName())
                .roles(roles)
                .build();
    }

    public UserDto getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !(authentication.getPrincipal() instanceof UserPrincipal principal)) {
            throw new BadRequestException("No active authenticated session");
        }

        User user = userRepository.findById(principal.getId())
                .orElseThrow(() -> new BadRequestException("User profile not found"));

        return mapToDto(user);
    }

    public static UserDto mapToDto(User user) {
        return UserDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .phone(user.getPhone())
                .isActive(user.getIsActive())
                .roles(user.getRoles().stream().map(r -> r.getName().name()).collect(Collectors.toSet()))
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }
}
