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
public class QuoteRequestDto {
    private Long id;
    private String quoteNumber;

    @NotBlank(message = "Contact name is required")
    private String name;

    private String company;

    @NotBlank(message = "Email is required")
    @Email(message = "Valid email is required")
    private String email;

    @NotBlank(message = "Phone number is required")
    private String phone;

    @NotBlank(message = "Service required is mandatory")
    private String serviceRequired;

    @NotBlank(message = "Location is required")
    private String location;

    private Integer numberOfGuardsRequired;
    private String startDate;
    private String duration;
    private String securityRequirements;
    private String message;
    private String status;
    private String internalNotes;
    private Double quotedAmount;
    private String assignedStaffName;
    private LocalDateTime createdAt;
}
