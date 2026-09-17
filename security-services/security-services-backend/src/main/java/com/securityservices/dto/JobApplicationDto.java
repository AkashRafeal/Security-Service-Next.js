package com.securityservices.dto;

import jakarta.validation.constraints.Email;
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
public class JobApplicationDto {
    private Long id;
    private Long jobPostId;
    private String jobTitle;

    @NotBlank(message = "Name is required")
    private String applicantName;

    @NotBlank(message = "Email is required")
    @Email(message = "Valid email is required")
    private String email;

    @NotBlank(message = "Phone number is required")
    private String phone;

    private String location;
    private String experienceYears;
    private String resumeUrl;
    private String resumeFileName;
    private String message;
    private String status;
    private String internalNotes;
    private LocalDateTime createdAt;
}
