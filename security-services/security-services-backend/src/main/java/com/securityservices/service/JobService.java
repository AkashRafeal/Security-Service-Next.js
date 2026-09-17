package com.securityservices.service;

import com.securityservices.dto.JobApplicationDto;
import com.securityservices.dto.JobPostDto;
import com.securityservices.entity.JobApplication;
import com.securityservices.entity.JobPost;
import com.securityservices.exception.ResourceNotFoundException;
import com.securityservices.repository.JobApplicationRepository;
import com.securityservices.repository.JobPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class JobService {

    private final JobPostRepository jobPostRepository;
    private final JobApplicationRepository jobApplicationRepository;
    private final FileStorageService fileStorageService;
    private final AuditLogService auditLogService;

    // --- Job Posts ---

    public List<JobPostDto> getActiveJobs() {
        return jobPostRepository.findByStatusOrderByCreatedAtDesc("ACTIVE").stream()
                .map(this::mapJobToDto)
                .collect(Collectors.toList());
    }

    public List<JobPostDto> getAllJobs() {
        return jobPostRepository.findAll().stream()
                .map(this::mapJobToDto)
                .collect(Collectors.toList());
    }

    public JobPostDto getJobById(Long id) {
        JobPost job = jobPostRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job post not found with id: " + id));
        return mapJobToDto(job);
    }

    @Transactional
    public JobPostDto createJob(JobPostDto dto, String performedBy) {
        String slug = (dto.getSlug() != null && !dto.getSlug().isBlank()) ? dto.getSlug() : SecurityServiceManagementService.toSlug(dto.getTitle());

        JobPost job = JobPost.builder()
                .title(dto.getTitle())
                .slug(slug)
                .location(dto.getLocation())
                .employmentType(dto.getEmploymentType() != null ? dto.getEmploymentType() : "Full-time")
                .experienceRequired(dto.getExperienceRequired())
                .salaryRange(dto.getSalaryRange())
                .description(dto.getDescription())
                .responsibilitiesJson(dto.getResponsibilitiesJson())
                .requirementsJson(dto.getRequirementsJson())
                .status(dto.getStatus() != null ? dto.getStatus() : "ACTIVE")
                .applicationDeadline(dto.getApplicationDeadline())
                .build();

        JobPost saved = jobPostRepository.save(job);
        auditLogService.log("JOB_CREATE", performedBy, "JobPost", saved.getId(), "Created job post " + saved.getTitle(), null);
        return mapJobToDto(saved);
    }

    @Transactional
    public JobPostDto updateJob(Long id, JobPostDto dto, String performedBy) {
        JobPost job = jobPostRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job post not found with id: " + id));

        job.setTitle(dto.getTitle());
        if (dto.getSlug() != null && !dto.getSlug().isBlank()) job.setSlug(dto.getSlug());
        job.setLocation(dto.getLocation());
        if (dto.getEmploymentType() != null) job.setEmploymentType(dto.getEmploymentType());
        job.setExperienceRequired(dto.getExperienceRequired());
        job.setSalaryRange(dto.getSalaryRange());
        job.setDescription(dto.getDescription());
        job.setResponsibilitiesJson(dto.getResponsibilitiesJson());
        job.setRequirementsJson(dto.getRequirementsJson());
        if (dto.getStatus() != null) job.setStatus(dto.getStatus());
        if (dto.getApplicationDeadline() != null) job.setApplicationDeadline(dto.getApplicationDeadline());

        JobPost saved = jobPostRepository.save(job);
        auditLogService.log("JOB_UPDATE", performedBy, "JobPost", saved.getId(), "Updated job post " + saved.getTitle(), null);
        return mapJobToDto(saved);
    }

    @Transactional
    public void deleteJob(Long id, String performedBy) {
        JobPost job = jobPostRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job post not found with id: " + id));
        jobPostRepository.delete(job);
        auditLogService.log("JOB_DELETE", performedBy, "JobPost", id, "Deleted job post " + job.getTitle(), null);
    }

    @Transactional
    public void toggleJobStatus(Long id, String performedBy) {
        JobPost job = jobPostRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job post not found with id: " + id));
        String newStatus = "ACTIVE".equalsIgnoreCase(job.getStatus()) ? "CLOSED" : "ACTIVE";
        job.setStatus(newStatus);
        jobPostRepository.save(job);
        auditLogService.log("JOB_STATUS_TOGGLE", performedBy, "JobPost", id, "Toggled job status to " + newStatus, null);
    }

    // --- Job Applications ---

    @Transactional
    public JobApplicationDto submitApplication(
            Long jobPostId,
            String name,
            String email,
            String phone,
            String location,
            String experienceYears,
            String message,
            MultipartFile resumeFile) {

        JobPost job = null;
        if (jobPostId != null) {
            job = jobPostRepository.findById(jobPostId).orElse(null);
        }

        String resumeUrl = null;
        String originalName = null;
        if (resumeFile != null && !resumeFile.isEmpty()) {
            resumeUrl = fileStorageService.storeResume(resumeFile);
            originalName = resumeFile.getOriginalFilename();
        }

        JobApplication app = JobApplication.builder()
                .jobPost(job)
                .applicantName(name)
                .email(email)
                .phone(phone)
                .location(location)
                .experienceYears(experienceYears)
                .resumeUrl(resumeUrl)
                .resumeFileName(originalName)
                .message(message)
                .status("NEW")
                .build();

        JobApplication saved = jobApplicationRepository.save(app);
        auditLogService.log("APPLICATION_SUBMIT", name, "JobApplication", saved.getId(), "New application for job ID " + jobPostId, null);
        return mapAppToDto(saved);
    }

    public List<JobApplicationDto> getAllApplications(String status) {
        List<JobApplication> list;
        if (status != null && !status.isBlank() && !status.equalsIgnoreCase("ALL")) {
            list = jobApplicationRepository.findByStatusOrderByCreatedAtDesc(status.toUpperCase());
        } else {
            list = jobApplicationRepository.findAllByOrderByCreatedAtDesc();
        }
        return list.stream().map(this::mapAppToDto).collect(Collectors.toList());
    }

    @Transactional
    public JobApplicationDto updateApplicationStatus(Long id, String status, String internalNotes, String performedBy) {
        JobApplication app = jobApplicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job application not found with id: " + id));

        if (status != null && !status.isBlank()) {
            app.setStatus(status.toUpperCase());
        }
        if (internalNotes != null) {
            app.setInternalNotes(internalNotes);
        }

        JobApplication saved = jobApplicationRepository.save(app);
        auditLogService.log("APPLICATION_STATUS_UPDATE", performedBy, "JobApplication", id, "Changed status to " + status, null);
        return mapAppToDto(saved);
    }

    private JobPostDto mapJobToDto(JobPost job) {
        long appCount = job.getApplications() != null ? job.getApplications().size() : 0L;
        return JobPostDto.builder()
                .id(job.getId())
                .title(job.getTitle())
                .slug(job.getSlug())
                .location(job.getLocation())
                .employmentType(job.getEmploymentType())
                .experienceRequired(job.getExperienceRequired())
                .salaryRange(job.getSalaryRange())
                .description(job.getDescription())
                .responsibilitiesJson(job.getResponsibilitiesJson())
                .requirementsJson(job.getRequirementsJson())
                .status(job.getStatus())
                .applicationDeadline(job.getApplicationDeadline())
                .applicationsCount(appCount)
                .createdAt(job.getCreatedAt())
                .build();
    }

    private JobApplicationDto mapAppToDto(JobApplication a) {
        return JobApplicationDto.builder()
                .id(a.getId())
                .jobPostId(a.getJobPost() != null ? a.getJobPost().getId() : null)
                .jobTitle(a.getJobPost() != null ? a.getJobPost().getTitle() : "General Application")
                .applicantName(a.getApplicantName())
                .email(a.getEmail())
                .phone(a.getPhone())
                .location(a.getLocation())
                .experienceYears(a.getExperienceYears())
                .resumeUrl(a.getResumeUrl())
                .resumeFileName(a.getResumeFileName())
                .message(a.getMessage())
                .status(a.getStatus())
                .internalNotes(a.getInternalNotes())
                .createdAt(a.getCreatedAt())
                .build();
    }
}
