package com.securityservices.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "team_members")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TeamMember extends BaseEntity {

    @Column(nullable = false, length = 120)
    private String name;

    @Column(nullable = false, length = 120)
    private String designation;

    @Column(name = "profile_image_url", length = 500)
    private String profileImageUrl;

    @Column(name = "experience_years")
    @Builder.Default
    private Integer experienceYears = 5;

    @Column(columnDefinition = "LONGTEXT")
    private String bio;

    @Column(name = "specializations", length = 300)
    private String specializations;

    @Column(length = 120)
    private String email;

    @Column(name = "linkedin_url", length = 255)
    private String linkedinUrl;

    @Column(name = "display_order")
    @Builder.Default
    private Integer displayOrder = 0;

    @Column(name = "is_active")
    @Builder.Default
    private Boolean isActive = true;
}
