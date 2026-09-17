package com.securityservices.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ServiceDto {
    private Long id;

    @NotBlank(message = "Service name is required")
    private String name;

    private String slug;
    private Long categoryId;
    private String categoryName;
    private String shortDescription;
    private String description;
    private String imageUrl;
    private String icon;
    private String featuresJson;
    private String benefitsJson;
    private String processJson;
    private String faqJson;
    private String targetIndustries;
    private Integer displayOrder;
    private Boolean isFeatured;
    private Boolean isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
