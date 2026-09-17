package com.securityservices.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "faqs", indexes = {
        @Index(name = "idx_faqs_cat", columnList = "category")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Faq extends BaseEntity {

    @Column(nullable = false, length = 300)
    private String question;

    @Column(columnDefinition = "LONGTEXT", nullable = false)
    private String answer;

    @Column(length = 80)
    @Builder.Default
    private String category = "General"; // General, Guards, Corporate, Tech & CCTV, Contracts

    @Column(name = "display_order")
    @Builder.Default
    private Integer displayOrder = 0;

    @Column(name = "is_active")
    @Builder.Default
    private Boolean isActive = true;
}
