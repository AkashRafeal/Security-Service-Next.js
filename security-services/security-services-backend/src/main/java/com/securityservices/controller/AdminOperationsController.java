package com.securityservices.controller;

import com.securityservices.dto.*;
import com.securityservices.service.ContactEnquiryService;
import com.securityservices.service.JobService;
import com.securityservices.service.QuoteRequestService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminOperationsController {

    private final QuoteRequestService quoteRequestService;
    private final ContactEnquiryService contactEnquiryService;
    private final JobService jobService;

    // --- Quotes ---
    @GetMapping("/quotes")
    public ResponseEntity<ApiResponse<List<QuoteRequestDto>>> getAllQuotes(
            @RequestParam(required = false) String status) {
        return ResponseEntity.ok(ApiResponse.ok(quoteRequestService.getAllQuotes(status)));
    }

    @GetMapping("/quotes/{id}")
    public ResponseEntity<ApiResponse<QuoteRequestDto>> getQuoteById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(quoteRequestService.getQuoteById(id)));
    }

    @PatchMapping("/quotes/{id}/status")
    public ResponseEntity<ApiResponse<QuoteRequestDto>> updateQuoteStatus(
            @PathVariable Long id,
            @RequestBody Map<String, Object> payload,
            @AuthenticationPrincipal UserDetails userDetails) {

        String status = (String) payload.get("status");
        String internalNotes = (String) payload.get("internalNotes");
        Double quotedAmount = null;
        if (payload.get("quotedAmount") != null) {
            quotedAmount = Double.valueOf(payload.get("quotedAmount").toString());
        }
        String assignedStaff = (String) payload.get("assignedStaffName");

        QuoteRequestDto updated = quoteRequestService.updateQuoteStatus(
                id, status, internalNotes, quotedAmount, assignedStaff, userDetails.getUsername()
        );
        return ResponseEntity.ok(ApiResponse.ok(updated, "Quote status updated"));
    }

    // --- Contact Enquiries ---
    @GetMapping("/enquiries")
    public ResponseEntity<ApiResponse<List<ContactEnquiryDto>>> getAllEnquiries(
            @RequestParam(required = false) String status) {
        return ResponseEntity.ok(ApiResponse.ok(contactEnquiryService.getAllEnquiries(status)));
    }

    @PatchMapping("/enquiries/{id}/status")
    public ResponseEntity<ApiResponse<ContactEnquiryDto>> updateEnquiryStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> payload,
            @AuthenticationPrincipal UserDetails userDetails) {
        String status = payload.get("status");
        String internalNotes = payload.get("internalNotes");
        ContactEnquiryDto updated = contactEnquiryService.updateEnquiryStatus(id, status, internalNotes, userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.ok(updated, "Enquiry status updated"));
    }

    @DeleteMapping("/enquiries/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteEnquiry(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        contactEnquiryService.deleteEnquiry(id, userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.ok(null, "Enquiry deleted"));
    }

    // --- Jobs ---
    @GetMapping("/jobs")
    public ResponseEntity<ApiResponse<List<JobPostDto>>> getAllJobs() {
        return ResponseEntity.ok(ApiResponse.ok(jobService.getAllJobs()));
    }

    @PostMapping("/jobs")
    public ResponseEntity<ApiResponse<JobPostDto>> createJob(
            @Valid @RequestBody JobPostDto dto,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(ApiResponse.ok(jobService.createJob(dto, userDetails.getUsername())));
    }

    @PutMapping("/jobs/{id}")
    public ResponseEntity<ApiResponse<JobPostDto>> updateJob(
            @PathVariable Long id,
            @Valid @RequestBody JobPostDto dto,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(ApiResponse.ok(jobService.updateJob(id, dto, userDetails.getUsername())));
    }

    @PatchMapping("/jobs/{id}/toggle-status")
    public ResponseEntity<ApiResponse<Void>> toggleJobStatus(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        jobService.toggleJobStatus(id, userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.ok(null, "Job status toggled"));
    }

    @DeleteMapping("/jobs/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteJob(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        jobService.deleteJob(id, userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.ok(null, "Job post deleted"));
    }

    // --- Job Applications ---
    @GetMapping("/applications")
    public ResponseEntity<ApiResponse<List<JobApplicationDto>>> getAllApplications(
            @RequestParam(required = false) String status) {
        return ResponseEntity.ok(ApiResponse.ok(jobService.getAllApplications(status)));
    }

    @PatchMapping("/applications/{id}/status")
    public ResponseEntity<ApiResponse<JobApplicationDto>> updateApplicationStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> payload,
            @AuthenticationPrincipal UserDetails userDetails) {
        String status = payload.get("status");
        String internalNotes = payload.get("internalNotes");
        JobApplicationDto updated = jobService.updateApplicationStatus(id, status, internalNotes, userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.ok(updated, "Application status updated"));
    }
}
