package com.securityservices.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "job_applications", indexes = {
        @Index(name = "idx_app_email", columnList = "email"),
        @Index(name = "idx_app_status", columnList = "status")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobApplication extends BaseEntity {

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "job_post_id")
    @JsonIgnoreProperties("applications")
    private JobPost jobPost;

    @Column(name = "applicant_name", nullable = false, length = 120)
    private String applicantName;

    @Column(nullable = false, length = 120)
    private String email;

    @Column(nullable = false, length = 30)
    private String phone;

    @Column(length = 100)
    private String location;

    @Column(name = "experience_years", length = 50)
    private String experienceYears;

    @Column(name = "resume_url", length = 500)
    private String resumeUrl;

    @Column(name = "resume_file_name", length = 255)
    private String resumeFileName;

    @Column(columnDefinition = "LONGTEXT")
    private String message;

    @Column(nullable = false, length = 30)
    @Builder.Default
    private String status = "NEW"; // NEW, REVIEWING, SHORTLISTED, INTERVIEW, SELECTED, REJECTED

    @Column(name = "internal_notes", columnDefinition = "TEXT")
    private String internalNotes;
}
