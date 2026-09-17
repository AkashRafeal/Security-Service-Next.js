package com.securityservices.service;

import com.securityservices.dto.IndustryDto;
import com.securityservices.entity.Industry;
import com.securityservices.exception.ResourceNotFoundException;
import com.securityservices.repository.IndustryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class IndustryService {

    private final IndustryRepository industryRepository;
    private final AuditLogService auditLogService;

    public List<IndustryDto> getActiveIndustries() {
        return industryRepository.findByIsActiveTrueOrderByDisplayOrderAsc().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public List<IndustryDto> getAllIndustries() {
        return industryRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public IndustryDto getIndustryBySlug(String slug) {
        Industry entity = industryRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Industry not found with slug: " + slug));
        return mapToDto(entity);
    }

    @Transactional
    public IndustryDto createIndustry(IndustryDto dto, String performedBy) {
        String slug = (dto.getSlug() != null && !dto.getSlug().isBlank()) ? dto.getSlug() : SecurityServiceManagementService.toSlug(dto.getName());
        if (industryRepository.existsBySlug(slug)) {
            slug = slug + "-" + System.currentTimeMillis() % 10000;
        }

        Industry entity = Industry.builder()
                .name(dto.getName())
                .slug(slug)
                .icon(dto.getIcon())
                .shortDescription(dto.getShortDescription())
                .description(dto.getDescription())
                .keySecurityNeedsJson(dto.getKeySecurityNeedsJson())
                .solutionsJson(dto.getSolutionsJson())
                .imageUrl(dto.getImageUrl())
                .displayOrder(dto.getDisplayOrder() != null ? dto.getDisplayOrder() : 0)
                .isActive(dto.getIsActive() == null || dto.getIsActive())
                .build();

        Industry saved = industryRepository.save(entity);
        auditLogService.log("INDUSTRY_CREATE", performedBy, "Industry", saved.getId(), "Created industry " + saved.getName(), null);
        return mapToDto(saved);
    }

    @Transactional
    public IndustryDto updateIndustry(Long id, IndustryDto dto, String performedBy) {
        Industry entity = industryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Industry not found with id: " + id));

        entity.setName(dto.getName());
        if (dto.getSlug() != null && !dto.getSlug().isBlank()) {
            entity.setSlug(dto.getSlug());
        }
        entity.setIcon(dto.getIcon());
        entity.setShortDescription(dto.getShortDescription());
        entity.setDescription(dto.getDescription());
        entity.setKeySecurityNeedsJson(dto.getKeySecurityNeedsJson());
        entity.setSolutionsJson(dto.getSolutionsJson());
        entity.setImageUrl(dto.getImageUrl());
        if (dto.getDisplayOrder() != null) entity.setDisplayOrder(dto.getDisplayOrder());
        if (dto.getIsActive() != null) entity.setIsActive(dto.getIsActive());

        Industry saved = industryRepository.save(entity);
        auditLogService.log("INDUSTRY_UPDATE", performedBy, "Industry", saved.getId(), "Updated industry " + saved.getName(), null);
        return mapToDto(saved);
    }

    @Transactional
    public void deleteIndustry(Long id, String performedBy) {
        Industry entity = industryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Industry not found with id: " + id));
        industryRepository.delete(entity);
        auditLogService.log("INDUSTRY_DELETE", performedBy, "Industry", id, "Deleted industry " + entity.getName(), null);
    }

    private IndustryDto mapToDto(Industry entity) {
        return IndustryDto.builder()
                .id(entity.getId())
                .name(entity.getName())
                .slug(entity.getSlug())
                .icon(entity.getIcon())
                .shortDescription(entity.getShortDescription())
                .description(entity.getDescription())
                .keySecurityNeedsJson(entity.getKeySecurityNeedsJson())
                .solutionsJson(entity.getSolutionsJson())
                .imageUrl(entity.getImageUrl())
                .displayOrder(entity.getDisplayOrder())
                .isActive(entity.getIsActive())
                .build();
    }
}
