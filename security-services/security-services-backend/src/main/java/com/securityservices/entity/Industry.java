package com.securityservices.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "industries", indexes = {
        @Index(name = "idx_industries_slug", columnList = "slug")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Industry extends BaseEntity {

    @Column(nullable = false, length = 120)
    private String name;

    @Column(nullable = false, unique = true, length = 120)
    private String slug;

    @Column(length = 60)
    private String icon;

    @Column(name = "short_description", length = 350)
    private String shortDescription;

    @Column(columnDefinition = "LONGTEXT")
    private String description;

    @Column(name = "key_security_needs", columnDefinition = "TEXT")
    private String keySecurityNeedsJson;

    @Column(name = "solutions_json", columnDefinition = "TEXT")
    private String solutionsJson;

    @Column(name = "image_url", length = 500)
    private String imageUrl;

    @Column(name = "display_order")
    @Builder.Default
    private Integer displayOrder = 0;

    @Column(name = "is_active")
    @Builder.Default
    private Boolean isActive = true;
}
