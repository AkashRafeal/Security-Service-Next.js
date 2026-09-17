package com.securityservices.service;

import com.securityservices.dto.ServiceCategoryDto;
import com.securityservices.dto.ServiceDto;
import com.securityservices.entity.SecurityService;
import com.securityservices.entity.ServiceCategory;
import com.securityservices.exception.DuplicateResourceException;
import com.securityservices.exception.ResourceNotFoundException;
import com.securityservices.repository.SecurityServiceRepository;
import com.securityservices.repository.ServiceCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.Normalizer;
import java.util.List;
import java.util.Locale;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SecurityServiceManagementService {

    private final SecurityServiceRepository serviceRepository;
    private final ServiceCategoryRepository categoryRepository;
    private final AuditLogService auditLogService;

    private static final Pattern NONLATIN = Pattern.compile("[^\\w-]");
    private static final Pattern WHITESPACE = Pattern.compile("[\\s]");

    public static String toSlug(String input) {
        if (input == null) return "";
        String nowhitespace = WHITESPACE.matcher(input.trim()).replaceAll("-");
        String normalized = Normalizer.normalize(nowhitespace, Normalizer.Form.NFD);
        String slug = NONLATIN.matcher(normalized).replaceAll("");
        return slug.toLowerCase(Locale.ENGLISH);
    }

    // --- Services ---

    public List<ServiceDto> getAllPublicServices() {
        return serviceRepository.findByIsActiveTrueOrderByDisplayOrderAsc().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public List<ServiceDto> getFeaturedServices() {
        return serviceRepository.findByIsActiveTrueAndIsFeaturedTrueOrderByDisplayOrderAsc().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public ServiceDto getServiceBySlug(String slug) {
        SecurityService service = serviceRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Service not found with slug: " + slug));
        return mapToDto(service);
    }

    public List<ServiceDto> getAllAdminServices() {
        return serviceRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public ServiceDto createService(ServiceDto dto, String performedBy) {
        String slug = (dto.getSlug() != null && !dto.getSlug().isBlank()) ? dto.getSlug() : toSlug(dto.getName());
        if (serviceRepository.existsBySlug(slug)) {
            slug = slug + "-" + System.currentTimeMillis() % 10000;
        }

        ServiceCategory category = null;
        if (dto.getCategoryId() != null) {
            category = categoryRepository.findById(dto.getCategoryId())
                    .orElse(null);
        }

        SecurityService entity = SecurityService.builder()
                .name(dto.getName())
                .slug(slug)
                .category(category)
                .shortDescription(dto.getShortDescription())
                .description(dto.getDescription())
                .imageUrl(dto.getImageUrl())
                .icon(dto.getIcon())
                .featuresJson(dto.getFeaturesJson())
                .benefitsJson(dto.getBenefitsJson())
                .processJson(dto.getProcessJson())
                .faqJson(dto.getFaqJson())
                .targetIndustries(dto.getTargetIndustries())
                .displayOrder(dto.getDisplayOrder() != null ? dto.getDisplayOrder() : 0)
                .isFeatured(Boolean.TRUE.equals(dto.getIsFeatured()))
                .isActive(dto.getIsActive() == null || dto.getIsActive())
                .build();

        SecurityService saved = serviceRepository.save(entity);
        auditLogService.log("SERVICE_CREATE", performedBy, "SecurityService", saved.getId(), "Created service " + saved.getName(), null);

        return mapToDto(saved);
    }

    @Transactional
    public ServiceDto updateService(Long id, ServiceDto dto, String performedBy) {
        SecurityService entity = serviceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Service not found with id: " + id));

        if (dto.getSlug() != null && !dto.getSlug().equalsIgnoreCase(entity.getSlug()) && serviceRepository.existsBySlug(dto.getSlug())) {
            throw new DuplicateResourceException("Slug already in use: " + dto.getSlug());
        }

        if (dto.getCategoryId() != null) {
            ServiceCategory category = categoryRepository.findById(dto.getCategoryId()).orElse(null);
            entity.setCategory(category);
        }

        entity.setName(dto.getName());
        if (dto.getSlug() != null && !dto.getSlug().isBlank()) {
            entity.setSlug(dto.getSlug());
        }
        entity.setShortDescription(dto.getShortDescription());
        entity.setDescription(dto.getDescription());
        entity.setImageUrl(dto.getImageUrl());
        entity.setIcon(dto.getIcon());
        entity.setFeaturesJson(dto.getFeaturesJson());
        entity.setBenefitsJson(dto.getBenefitsJson());
        entity.setProcessJson(dto.getProcessJson());
        entity.setFaqJson(dto.getFaqJson());
        entity.setTargetIndustries(dto.getTargetIndustries());
        if (dto.getDisplayOrder() != null) entity.setDisplayOrder(dto.getDisplayOrder());
        if (dto.getIsFeatured() != null) entity.setIsFeatured(dto.getIsFeatured());
        if (dto.getIsActive() != null) entity.setIsActive(dto.getIsActive());

        SecurityService updated = serviceRepository.save(entity);
        auditLogService.log("SERVICE_UPDATE", performedBy, "SecurityService", updated.getId(), "Updated service " + updated.getName(), null);

        return mapToDto(updated);
    }

    @Transactional
    public void deleteService(Long id, String performedBy) {
        SecurityService entity = serviceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Service not found with id: " + id));
        serviceRepository.delete(entity);
        auditLogService.log("SERVICE_DELETE", performedBy, "SecurityService", id, "Deleted service " + entity.getName(), null);
    }

    @Transactional
    public void toggleServiceStatus(Long id, String performedBy) {
        SecurityService entity = serviceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Service not found with id: " + id));
        entity.setIsActive(!entity.getIsActive());
        serviceRepository.save(entity);
        auditLogService.log("SERVICE_STATUS_TOGGLE", performedBy, "SecurityService", id, "Toggled status to " + entity.getIsActive(), null);
    }

    // --- Categories ---

    public List<ServiceCategoryDto> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(this::mapCategoryToDto)
                .collect(Collectors.toList());
    }

    public List<ServiceCategoryDto> getActiveCategories() {
        return categoryRepository.findByIsActiveTrueOrderByDisplayOrderAsc().stream()
                .map(this::mapCategoryToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public ServiceCategoryDto createCategory(ServiceCategoryDto dto, String performedBy) {
        String slug = (dto.getSlug() != null && !dto.getSlug().isBlank()) ? dto.getSlug() : toSlug(dto.getName());
        if (categoryRepository.existsBySlug(slug)) {
            slug = slug + "-" + System.currentTimeMillis() % 10000;
        }

        ServiceCategory entity = ServiceCategory.builder()
                .name(dto.getName())
                .slug(slug)
                .description(dto.getDescription())
                .icon(dto.getIcon())
                .displayOrder(dto.getDisplayOrder() != null ? dto.getDisplayOrder() : 0)
                .isActive(dto.getIsActive() == null || dto.getIsActive())
                .build();

        ServiceCategory saved = categoryRepository.save(entity);
        auditLogService.log("CATEGORY_CREATE", performedBy, "ServiceCategory", saved.getId(), "Created category " + saved.getName(), null);

        return mapCategoryToDto(saved);
    }

    @Transactional
    public ServiceCategoryDto updateCategory(Long id, ServiceCategoryDto dto, String performedBy) {
        ServiceCategory entity = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));

        entity.setName(dto.getName());
        if (dto.getSlug() != null && !dto.getSlug().isBlank()) {
            entity.setSlug(dto.getSlug());
        }
        entity.setDescription(dto.getDescription());
        entity.setIcon(dto.getIcon());
        if (dto.getDisplayOrder() != null) entity.setDisplayOrder(dto.getDisplayOrder());
        if (dto.getIsActive() != null) entity.setIsActive(dto.getIsActive());

        ServiceCategory saved = categoryRepository.save(entity);
        auditLogService.log("CATEGORY_UPDATE", performedBy, "ServiceCategory", saved.getId(), "Updated category " + saved.getName(), null);

        return mapCategoryToDto(saved);
    }

    @Transactional
    public void deleteCategory(Long id, String performedBy) {
        ServiceCategory entity = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));
        categoryRepository.delete(entity);
        auditLogService.log("CATEGORY_DELETE", performedBy, "ServiceCategory", id, "Deleted category " + entity.getName(), null);
    }

    private ServiceDto mapToDto(SecurityService entity) {
        return ServiceDto.builder()
                .id(entity.getId())
                .name(entity.getName())
                .slug(entity.getSlug())
                .categoryId(entity.getCategory() != null ? entity.getCategory().getId() : null)
                .categoryName(entity.getCategory() != null ? entity.getCategory().getName() : null)
                .shortDescription(entity.getShortDescription())
                .description(entity.getDescription())
                .imageUrl(entity.getImageUrl())
                .icon(entity.getIcon())
                .featuresJson(entity.getFeaturesJson())
                .benefitsJson(entity.getBenefitsJson())
                .processJson(entity.getProcessJson())
                .faqJson(entity.getFaqJson())
                .targetIndustries(entity.getTargetIndustries())
                .displayOrder(entity.getDisplayOrder())
                .isFeatured(entity.getIsFeatured())
                .isActive(entity.getIsActive())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }

    private ServiceCategoryDto mapCategoryToDto(ServiceCategory entity) {
        return ServiceCategoryDto.builder()
                .id(entity.getId())
                .name(entity.getName())
                .slug(entity.getSlug())
                .description(entity.getDescription())
                .icon(entity.getIcon())
                .displayOrder(entity.getDisplayOrder())
                .isActive(entity.getIsActive())
                .build();
    }
}
