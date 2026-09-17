package com.securityservices.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JobPostDto {
    private Long id;

    @NotBlank(message = "Job title is required")
    private String title;

    private String slug;

    @NotBlank(message = "Location is required")
    private String location;

    private String employmentType;
    private String experienceRequired;
    private String salaryRange;

    @NotBlank(message = "Description is required")
    private String description;

    private String responsibilitiesJson;
    private String requirementsJson;
    private String status;
    private LocalDate applicationDeadline;
    private Long applicationsCount;
    private LocalDateTime createdAt;
}
