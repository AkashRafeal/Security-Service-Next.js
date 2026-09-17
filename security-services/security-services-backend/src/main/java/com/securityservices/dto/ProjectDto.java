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
public class ProjectDto {
    private Long id;

    @NotBlank(message = "Project title is required")
    private String title;

    private String slug;
    private String clientName;
    private String clientType;
    private String location;
    private String securityRequirement;
    private String securitySolution;
    private String results;
    private String featuredImageUrl;
    private String galleryUrlsJson;
    private Boolean isPublished;
    private Integer displayOrder;
    private LocalDateTime createdAt;
}
