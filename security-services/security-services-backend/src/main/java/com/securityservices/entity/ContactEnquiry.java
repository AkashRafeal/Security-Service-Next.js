package com.securityservices.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "contact_enquiries", indexes = {
        @Index(name = "idx_enquiry_status", columnList = "status"),
        @Index(name = "idx_enquiry_email", columnList = "email"),
        @Index(name = "idx_enquiry_created", columnList = "created_at")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContactEnquiry extends BaseEntity {

    @Column(nullable = false, length = 120)
    private String name;

    @Column(nullable = false, length = 120)
    private String email;

    @Column(length = 30)
    private String phone;

    @Column(length = 200)
    private String subject;

    @Column(columnDefinition = "LONGTEXT", nullable = false)
    private String message;

    @Column(nullable = false, length = 30)
    @Builder.Default
    private String status = "NEW"; // NEW, CONTACTED, IN_PROGRESS, RESOLVED, CLOSED

    @Column(name = "internal_notes", columnDefinition = "TEXT")
    private String internalNotes;
}
