package com.securityservices.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "job_posts", indexes = {
        @Index(name = "idx_job_status", columnList = "status")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobPost extends BaseEntity {

    @Column(nullable = false, length = 150)
    private String title;

    @Column(length = 150)
    private String slug;

    @Column(nullable = false, length = 100)
    private String location;

    @Column(name = "employment_type", nullable = false, length = 50)
    @Builder.Default
    private String employmentType = "Full-time";

    @Column(name = "experience_required", length = 80)
    private String experienceRequired;

    @Column(name = "salary_range", length = 100)
    private String salaryRange;

    @Column(columnDefinition = "LONGTEXT", nullable = false)
    private String description;

    @Column(name = "responsibilities", columnDefinition = "TEXT")
    private String responsibilitiesJson;

    @Column(name = "requirements", columnDefinition = "TEXT")
    private String requirementsJson;

    @Column(length = 20, nullable = false)
    @Builder.Default
    private String status = "ACTIVE"; // ACTIVE, CLOSED

    @Column(name = "application_deadline")
    private LocalDate applicationDeadline;

    @OneToMany(mappedBy = "jobPost", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    private List<JobApplication> applications = new ArrayList<>();
}
