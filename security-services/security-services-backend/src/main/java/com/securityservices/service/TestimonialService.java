package com.securityservices.service;

import com.securityservices.dto.TestimonialDto;
import com.securityservices.entity.Testimonial;
import com.securityservices.exception.ResourceNotFoundException;
import com.securityservices.repository.TestimonialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TestimonialService {

    private final TestimonialRepository testimonialRepository;
    private final AuditLogService auditLogService;

    public List<TestimonialDto> getApprovedTestimonials() {
        return testimonialRepository.findByIsApprovedTrueOrderByDisplayOrderAsc().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public List<TestimonialDto> getFeaturedTestimonials() {
        return testimonialRepository.findByIsApprovedTrueAndIsFeaturedTrueOrderByDisplayOrderAsc().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public List<TestimonialDto> getAllTestimonials() {
        return testimonialRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public TestimonialDto createTestimonial(TestimonialDto dto, String performedBy) {
        Testimonial testimonial = Testimonial.builder()
                .customerName(dto.getCustomerName())
                .company(dto.getCompany())
                .designation(dto.getDesignation())
                .review(dto.getReview())
                .rating(dto.getRating() != null ? dto.getRating() : 5)
                .avatarUrl(dto.getAvatarUrl())
                .isFeatured(Boolean.TRUE.equals(dto.getIsFeatured()))
                .isApproved(dto.getIsApproved() == null || dto.getIsApproved())
                .displayOrder(dto.getDisplayOrder() != null ? dto.getDisplayOrder() : 0)
                .build();

        Testimonial saved = testimonialRepository.save(testimonial);
        auditLogService.log("TESTIMONIAL_CREATE", performedBy, "Testimonial", saved.getId(), "Added testimonial from " + saved.getCustomerName(), null);
        return mapToDto(saved);
    }

    @Transactional
    public TestimonialDto updateTestimonial(Long id, TestimonialDto dto, String performedBy) {
        Testimonial testimonial = testimonialRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Testimonial not found with id: " + id));

        testimonial.setCustomerName(dto.getCustomerName());
        testimonial.setCompany(dto.getCompany());
        testimonial.setDesignation(dto.getDesignation());
        testimonial.setReview(dto.getReview());
        if (dto.getRating() != null) testimonial.setRating(dto.getRating());
        testimonial.setAvatarUrl(dto.getAvatarUrl());
        if (dto.getIsFeatured() != null) testimonial.setIsFeatured(dto.getIsFeatured());
        if (dto.getIsApproved() != null) testimonial.setIsApproved(dto.getIsApproved());
        if (dto.getDisplayOrder() != null) testimonial.setDisplayOrder(dto.getDisplayOrder());

        Testimonial saved = testimonialRepository.save(testimonial);
        auditLogService.log("TESTIMONIAL_UPDATE", performedBy, "Testimonial", saved.getId(), "Updated testimonial from " + saved.getCustomerName(), null);
        return mapToDto(saved);
    }

    @Transactional
    public void deleteTestimonial(Long id, String performedBy) {
        Testimonial testimonial = testimonialRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Testimonial not found with id: " + id));
        testimonialRepository.delete(testimonial);
        auditLogService.log("TESTIMONIAL_DELETE", performedBy, "Testimonial", id, "Deleted testimonial from " + testimonial.getCustomerName(), null);
    }

    private TestimonialDto mapToDto(Testimonial t) {
        return TestimonialDto.builder()
                .id(t.getId())
                .customerName(t.getCustomerName())
                .company(t.getCompany())
                .designation(t.getDesignation())
                .review(t.getReview())
                .rating(t.getRating())
                .avatarUrl(t.getAvatarUrl())
                .isFeatured(t.getIsFeatured())
                .isApproved(t.getIsApproved())
                .displayOrder(t.getDisplayOrder())
                .build();
    }
}
