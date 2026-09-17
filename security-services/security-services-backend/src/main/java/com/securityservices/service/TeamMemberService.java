package com.securityservices.service;

import com.securityservices.dto.TeamMemberDto;
import com.securityservices.entity.TeamMember;
import com.securityservices.exception.ResourceNotFoundException;
import com.securityservices.repository.TeamMemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TeamMemberService {

    private final TeamMemberRepository teamMemberRepository;
    private final AuditLogService auditLogService;

    public List<TeamMemberDto> getActiveTeamMembers() {
        return teamMemberRepository.findByIsActiveTrueOrderByDisplayOrderAsc().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public List<TeamMemberDto> getAllTeamMembers() {
        return teamMemberRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public TeamMemberDto createTeamMember(TeamMemberDto dto, String performedBy) {
        TeamMember member = TeamMember.builder()
                .name(dto.getName())
                .designation(dto.getDesignation())
                .profileImageUrl(dto.getProfileImageUrl())
                .experienceYears(dto.getExperienceYears() != null ? dto.getExperienceYears() : 5)
                .bio(dto.getBio())
                .specializations(dto.getSpecializations())
                .email(dto.getEmail())
                .linkedinUrl(dto.getLinkedinUrl())
                .displayOrder(dto.getDisplayOrder() != null ? dto.getDisplayOrder() : 0)
                .isActive(dto.getIsActive() == null || dto.getIsActive())
                .build();

        TeamMember saved = teamMemberRepository.save(member);
        auditLogService.log("TEAM_CREATE", performedBy, "TeamMember", saved.getId(), "Added team member " + saved.getName(), null);
        return mapToDto(saved);
    }

    @Transactional
    public TeamMemberDto updateTeamMember(Long id, TeamMemberDto dto, String performedBy) {
        TeamMember member = teamMemberRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Team member not found with id: " + id));

        member.setName(dto.getName());
        member.setDesignation(dto.getDesignation());
        member.setProfileImageUrl(dto.getProfileImageUrl());
        if (dto.getExperienceYears() != null) member.setExperienceYears(dto.getExperienceYears());
        member.setBio(dto.getBio());
        member.setSpecializations(dto.getSpecializations());
        member.setEmail(dto.getEmail());
        member.setLinkedinUrl(dto.getLinkedinUrl());
        if (dto.getDisplayOrder() != null) member.setDisplayOrder(dto.getDisplayOrder());
        if (dto.getIsActive() != null) member.setIsActive(dto.getIsActive());

        TeamMember saved = teamMemberRepository.save(member);
        auditLogService.log("TEAM_UPDATE", performedBy, "TeamMember", saved.getId(), "Updated team member " + saved.getName(), null);
        return mapToDto(saved);
    }

    @Transactional
    public void deleteTeamMember(Long id, String performedBy) {
        TeamMember member = teamMemberRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Team member not found with id: " + id));
        teamMemberRepository.delete(member);
        auditLogService.log("TEAM_DELETE", performedBy, "TeamMember", id, "Deleted team member " + member.getName(), null);
    }

    private TeamMemberDto mapToDto(TeamMember member) {
        return TeamMemberDto.builder()
                .id(member.getId())
                .name(member.getName())
                .designation(member.getDesignation())
                .profileImageUrl(member.getProfileImageUrl())
                .experienceYears(member.getExperienceYears())
                .bio(member.getBio())
                .specializations(member.getSpecializations())
                .email(member.getEmail())
                .linkedinUrl(member.getLinkedinUrl())
                .displayOrder(member.getDisplayOrder())
                .isActive(member.getIsActive())
                .build();
    }
}
