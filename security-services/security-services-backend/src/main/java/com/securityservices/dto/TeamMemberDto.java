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
public class TeamMemberDto {
    private Long id;

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Designation is required")
    private String designation;

    private String profileImageUrl;
    private Integer experienceYears;
    private String bio;
    private String specializations;
    private String email;
    private String linkedinUrl;
    private Integer displayOrder;
    private Boolean isActive;
}
