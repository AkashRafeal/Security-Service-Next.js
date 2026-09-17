package com.securityservices.service;

import com.securityservices.dto.GalleryImageDto;
import com.securityservices.entity.GalleryImage;
import com.securityservices.exception.ResourceNotFoundException;
import com.securityservices.repository.GalleryImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GalleryService {

    private final GalleryImageRepository galleryImageRepository;
    private final AuditLogService auditLogService;

    public List<GalleryImageDto> getGalleryImages(String category) {
        List<GalleryImage> list;
        if (category != null && !category.isBlank() && !category.equalsIgnoreCase("All")) {
            list = galleryImageRepository.findByCategoryIgnoreCaseOrderByDisplayOrderAsc(category);
        } else {
            list = galleryImageRepository.findAllByOrderByDisplayOrderAsc();
        }
        return list.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public List<GalleryImageDto> getFeaturedGalleryImages() {
        return galleryImageRepository.findByIsFeaturedTrueOrderByDisplayOrderAsc().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public GalleryImageDto createImage(GalleryImageDto dto, String performedBy) {
        GalleryImage image = GalleryImage.builder()
                .title(dto.getTitle())
                .category(dto.getCategory())
                .imageUrl(dto.getImageUrl())
                .thumbnailUrl(dto.getThumbnailUrl() != null ? dto.getThumbnailUrl() : dto.getImageUrl())
                .description(dto.getDescription())
                .isFeatured(Boolean.TRUE.equals(dto.getIsFeatured()))
                .displayOrder(dto.getDisplayOrder() != null ? dto.getDisplayOrder() : 0)
                .build();

        GalleryImage saved = galleryImageRepository.save(image);
        auditLogService.log("GALLERY_CREATE", performedBy, "GalleryImage", saved.getId(), "Added gallery image " + saved.getTitle(), null);
        return mapToDto(saved);
    }

    @Transactional
    public GalleryImageDto updateImage(Long id, GalleryImageDto dto, String performedBy) {
        GalleryImage image = galleryImageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Gallery image not found with id: " + id));

        image.setTitle(dto.getTitle());
        image.setCategory(dto.getCategory());
        image.setImageUrl(dto.getImageUrl());
        if (dto.getThumbnailUrl() != null) image.setThumbnailUrl(dto.getThumbnailUrl());
        image.setDescription(dto.getDescription());
        if (dto.getIsFeatured() != null) image.setIsFeatured(dto.getIsFeatured());
        if (dto.getDisplayOrder() != null) image.setDisplayOrder(dto.getDisplayOrder());

        GalleryImage saved = galleryImageRepository.save(image);
        auditLogService.log("GALLERY_UPDATE", performedBy, "GalleryImage", saved.getId(), "Updated gallery image " + saved.getTitle(), null);
        return mapToDto(saved);
    }

    @Transactional
    public void deleteImage(Long id, String performedBy) {
        GalleryImage image = galleryImageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Gallery image not found with id: " + id));
        galleryImageRepository.delete(image);
        auditLogService.log("GALLERY_DELETE", performedBy, "GalleryImage", id, "Deleted gallery image " + image.getTitle(), null);
    }

    private GalleryImageDto mapToDto(GalleryImage img) {
        return GalleryImageDto.builder()
                .id(img.getId())
                .title(img.getTitle())
                .category(img.getCategory())
                .imageUrl(img.getImageUrl())
                .thumbnailUrl(img.getThumbnailUrl())
                .description(img.getDescription())
                .isFeatured(img.getIsFeatured())
                .displayOrder(img.getDisplayOrder())
                .build();
    }
}
