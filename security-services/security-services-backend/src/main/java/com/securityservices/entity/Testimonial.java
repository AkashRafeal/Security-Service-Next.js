package com.securityservices.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "testimonials")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Testimonial extends BaseEntity {

    @Column(name = "customer_name", nullable = false, length = 120)
    private String customerName;

    @Column(nullable = false, length = 120)
    private String company;

    @Column(length = 100)
    private String designation;

    @Column(columnDefinition = "LONGTEXT", nullable = false)
    private String review;

    @Column(nullable = false)
    @Builder.Default
    private Integer rating = 5;

    @Column(name = "avatar_url", length = 500)
    private String avatarUrl;

    @Column(name = "is_featured")
    @Builder.Default
    private Boolean isFeatured = false;

    @Column(name = "is_approved")
    @Builder.Default
    private Boolean isApproved = true;

    @Column(name = "display_order")
    @Builder.Default
    private Integer displayOrder = 0;
}
