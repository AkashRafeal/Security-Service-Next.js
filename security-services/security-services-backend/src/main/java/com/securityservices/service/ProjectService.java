package com.securityservices.service;

import com.securityservices.dto.ProjectDto;
import com.securityservices.entity.Project;
import com.securityservices.exception.ResourceNotFoundException;
import com.securityservices.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final AuditLogService auditLogService;

    public List<ProjectDto> getPublishedProjects() {
        return projectRepository.findByIsPublishedTrueOrderByDisplayOrderAsc().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public List<ProjectDto> getAllProjects() {
        return projectRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public ProjectDto getProjectByIdOrSlug(String idOrSlug) {
        Project project;
        try {
            Long id = Long.parseLong(idOrSlug);
            project = projectRepository.findById(id)
                    .or(() -> projectRepository.findBySlug(idOrSlug))
                    .orElseThrow(() -> new ResourceNotFoundException("Project not found: " + idOrSlug));
        } catch (NumberFormatException e) {
            project = projectRepository.findBySlug(idOrSlug)
                    .orElseThrow(() -> new ResourceNotFoundException("Project not found with slug: " + idOrSlug));
        }
        return mapToDto(project);
    }

    @Transactional
    public ProjectDto createProject(ProjectDto dto, String performedBy) {
        String slug = (dto.getSlug() != null && !dto.getSlug().isBlank()) ? dto.getSlug() : SecurityServiceManagementService.toSlug(dto.getTitle());
        if (projectRepository.existsBySlug(slug)) {
            slug = slug + "-" + System.currentTimeMillis() % 10000;
        }

        Project project = Project.builder()
                .title(dto.getTitle())
                .slug(slug)
                .clientName(dto.getClientName())
                .clientType(dto.getClientType())
                .location(dto.getLocation())
                .securityRequirement(dto.getSecurityRequirement())
                .securitySolution(dto.getSecuritySolution())
                .results(dto.getResults())
                .featuredImageUrl(dto.getFeaturedImageUrl())
                .galleryUrlsJson(dto.getGalleryUrlsJson())
                .isPublished(dto.getIsPublished() == null || dto.getIsPublished())
                .displayOrder(dto.getDisplayOrder() != null ? dto.getDisplayOrder() : 0)
                .build();

        Project saved = projectRepository.save(project);
        auditLogService.log("PROJECT_CREATE", performedBy, "Project", saved.getId(), "Created project " + saved.getTitle(), null);
        return mapToDto(saved);
    }

    @Transactional
    public ProjectDto updateProject(Long id, ProjectDto dto, String performedBy) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + id));

        project.setTitle(dto.getTitle());
        if (dto.getSlug() != null && !dto.getSlug().isBlank()) {
            project.setSlug(dto.getSlug());
        }
        project.setClientName(dto.getClientName());
        project.setClientType(dto.getClientType());
        project.setLocation(dto.getLocation());
        project.setSecurityRequirement(dto.getSecurityRequirement());
        project.setSecuritySolution(dto.getSecuritySolution());
        project.setResults(dto.getResults());
        project.setFeaturedImageUrl(dto.getFeaturedImageUrl());
        project.setGalleryUrlsJson(dto.getGalleryUrlsJson());
        if (dto.getIsPublished() != null) project.setIsPublished(dto.getIsPublished());
        if (dto.getDisplayOrder() != null) project.setDisplayOrder(dto.getDisplayOrder());

        Project saved = projectRepository.save(project);
        auditLogService.log("PROJECT_UPDATE", performedBy, "Project", saved.getId(), "Updated project " + saved.getTitle(), null);
        return mapToDto(saved);
    }

    @Transactional
    public void deleteProject(Long id, String performedBy) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + id));
        projectRepository.delete(project);
        auditLogService.log("PROJECT_DELETE", performedBy, "Project", id, "Deleted project " + project.getTitle(), null);
    }

    private ProjectDto mapToDto(Project project) {
        return ProjectDto.builder()
                .id(project.getId())
                .title(project.getTitle())
                .slug(project.getSlug())
                .clientName(project.getClientName())
                .clientType(project.getClientType())
                .location(project.getLocation())
                .securityRequirement(project.getSecurityRequirement())
                .securitySolution(project.getSecuritySolution())
                .results(project.getResults())
                .featuredImageUrl(project.getFeaturedImageUrl())
                .galleryUrlsJson(project.getGalleryUrlsJson())
                .isPublished(project.getIsPublished())
                .displayOrder(project.getDisplayOrder())
                .createdAt(project.getCreatedAt())
                .build();
    }
}
