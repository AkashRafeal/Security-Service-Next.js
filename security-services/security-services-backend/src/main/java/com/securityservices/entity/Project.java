package com.securityservices.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "projects", indexes = {
        @Index(name = "idx_projects_slug", columnList = "slug")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Project extends BaseEntity {

    @Column(nullable = false, length = 180)
    private String title;

    @Column(nullable = false, unique = true, length = 180)
    private String slug;

    @Column(name = "client_name", length = 120)
    private String clientName;

    @Column(name = "client_type", length = 100)
    private String clientType; // e.g. Corporate Tech Campus, Metro Hospital, Luxury Mall

    @Column(length = 120)
    private String location;

    @Column(name = "security_requirement", columnDefinition = "LONGTEXT")
    private String securityRequirement;

    @Column(name = "security_solution", columnDefinition = "LONGTEXT")
    private String securitySolution;

    @Column(columnDefinition = "LONGTEXT")
    private String results;

    @Column(name = "featured_image_url", length = 500)
    private String featuredImageUrl;

    @Column(name = "gallery_urls_json", columnDefinition = "TEXT")
    private String galleryUrlsJson;

    @Column(name = "is_published")
    @Builder.Default
    private Boolean isPublished = true;

    @Column(name = "display_order")
    @Builder.Default
    private Integer displayOrder = 0;
}
