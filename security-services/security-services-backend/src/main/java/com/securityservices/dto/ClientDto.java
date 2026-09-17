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
public class ClientDto {
    private Long id;

    @NotBlank(message = "Client name is required")
    private String name;

    private String category;
    private String logoUrl;
    private String websiteUrl;
    private Boolean isFeatured;
    private Integer displayOrder;
    private Boolean isActive;
}
