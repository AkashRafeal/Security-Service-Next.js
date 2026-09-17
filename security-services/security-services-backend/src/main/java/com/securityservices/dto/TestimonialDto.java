package com.securityservices.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TestimonialDto {
    private Long id;

    @NotBlank(message = "Customer name is required")
    private String customerName;

    @NotBlank(message = "Company name is required")
    private String company;

    private String designation;

    @NotBlank(message = "Review text is required")
    private String review;

    @Min(1)
    @Max(5)
    private Integer rating;

    private String avatarUrl;
    private Boolean isFeatured;
    private Boolean isApproved;
    private Integer displayOrder;
}
