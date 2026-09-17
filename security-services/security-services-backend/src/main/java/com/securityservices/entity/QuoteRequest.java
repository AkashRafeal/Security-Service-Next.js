package com.securityservices.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "quote_requests", indexes = {
        @Index(name = "idx_quote_status", columnList = "status"),
        @Index(name = "idx_quote_email", columnList = "email"),
        @Index(name = "idx_quote_created", columnList = "created_at")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuoteRequest extends BaseEntity {

    @Column(name = "quote_number", length = 40, unique = true)
    private String quoteNumber;

    @Column(nullable = false, length = 120)
    private String name;

    @Column(length = 150)
    private String company;

    @Column(nullable = false, length = 120)
    private String email;

    @Column(nullable = false, length = 30)
    private String phone;

    @Column(name = "service_required", nullable = false, length = 150)
    private String serviceRequired;

    @Column(nullable = false, length = 150)
    private String location;

    @Column(name = "number_of_guards")
    private Integer numberOfGuardsRequired;

    @Column(name = "start_date", length = 50)
    private String startDate;

    @Column(length = 50)
    private String duration; // e.g., "1 Month", "6 Months", "Annual Contract", "One-time Event"

    @Column(name = "security_requirements", columnDefinition = "LONGTEXT")
    private String securityRequirements;

    @Column(columnDefinition = "LONGTEXT")
    private String message;

    @Column(nullable = false, length = 30)
    @Builder.Default
    private String status = "NEW"; // NEW, CONTACTED, IN_PROGRESS, QUOTED, CONVERTED, REJECTED

    @Column(name = "internal_notes", columnDefinition = "TEXT")
    private String internalNotes;

    @Column(name = "quoted_amount")
    private Double quotedAmount;

    @Column(name = "assigned_staff_name", length = 100)
    private String assignedStaffName;
}
