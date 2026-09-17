package com.securityservices.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "services", indexes = {
        @Index(name = "idx_services_slug", columnList = "slug"),
        @Index(name = "idx_services_status", columnList = "is_active")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SecurityService extends BaseEntity {

    @Column(nullable = false, length = 150)
    private String name;

    @Column(nullable = false, unique = true, length = 150)
    private String slug;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id")
    @JsonIgnoreProperties("services")
    private ServiceCategory category;

    @Column(name = "short_description", length = 350)
    private String shortDescription;

    @Column(columnDefinition = "LONGTEXT")
    private String description;

    @Column(name = "image_url", length = 500)
    private String imageUrl;

    @Column(length = 60)
    private String icon;

    // JSON or serialized strings for structured dynamic details
    @Column(name = "features_json", columnDefinition = "LONGTEXT")
    private String featuresJson;

    @Column(name = "benefits_json", columnDefinition = "LONGTEXT")
    private String benefitsJson;

    @Column(name = "process_json", columnDefinition = "LONGTEXT")
    private String processJson;

    @Column(name = "faq_json", columnDefinition = "LONGTEXT")
    private String faqJson;

    @Column(name = "target_industries", columnDefinition = "TEXT")
    private String targetIndustries;

    @Column(name = "display_order")
    @Builder.Default
    private Integer displayOrder = 0;

    @Column(name = "is_featured")
    @Builder.Default
    private Boolean isFeatured = false;

    @Column(name = "is_active")
    @Builder.Default
    private Boolean isActive = true;
}
