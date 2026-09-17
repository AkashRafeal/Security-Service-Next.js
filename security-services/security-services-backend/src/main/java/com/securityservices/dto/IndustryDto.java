package com.securityservices.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class IndustryDto {
    private Long id;

    @NotBlank(message = "Industry name is required")
    private String name;

    private String slug;
    private String icon;
    private String shortDescription;
    private String description;
    private String keySecurityNeedsJson;
    private String solutionsJson;
    private String imageUrl;
    private Integer displayOrder;
    private Boolean isActive;
}
