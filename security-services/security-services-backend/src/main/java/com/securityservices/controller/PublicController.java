package com.securityservices.controller;

import com.securityservices.dto.*;
import com.securityservices.service.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/public")
@RequiredArgsConstructor
public class PublicController {

    private final SecurityServiceManagementService serviceService;
    private final IndustryService industryService;
    private final ClientService clientService;
    private final ProjectService projectService;
    private final TeamMemberService teamMemberService;
    private final TestimonialService testimonialService;
    private final GalleryService galleryService;
    private final BlogService blogService;
    private final FaqService faqService;
    private final JobService jobService;
    private final QuoteRequestService quoteRequestService;
    private final ContactEnquiryService contactEnquiryService;
    private final SiteSettingService siteSettingService;

    // --- Services ---
    @GetMapping("/services")
    public ResponseEntity<ApiResponse<List<ServiceDto>>> getServices() {
        return ResponseEntity.ok(ApiResponse.ok(serviceService.getAllPublicServices()));
    }

    @GetMapping("/services/featured")
    public ResponseEntity<ApiResponse<List<ServiceDto>>> getFeaturedServices() {
        return ResponseEntity.ok(ApiResponse.ok(serviceService.getFeaturedServices()));
    }

    @GetMapping("/services/{slug}")
    public ResponseEntity<ApiResponse<ServiceDto>> getServiceBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(ApiResponse.ok(serviceService.getServiceBySlug(slug)));
    }

    // --- Industries ---
    @GetMapping("/industries")
    public ResponseEntity<ApiResponse<List<IndustryDto>>> getIndustries() {
        return ResponseEntity.ok(ApiResponse.ok(industryService.getActiveIndustries()));
    }

    @GetMapping("/industries/{slug}")
    public ResponseEntity<ApiResponse<IndustryDto>> getIndustryBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(ApiResponse.ok(industryService.getIndustryBySlug(slug)));
    }

    // --- Clients ---
    @GetMapping("/clients")
    public ResponseEntity<ApiResponse<List<ClientDto>>> getClients() {
        return ResponseEntity.ok(ApiResponse.ok(clientService.getActiveClients()));
    }

    // --- Projects ---
    @GetMapping("/projects")
    public ResponseEntity<ApiResponse<List<ProjectDto>>> getProjects() {
        return ResponseEntity.ok(ApiResponse.ok(projectService.getPublishedProjects()));
    }

    @GetMapping("/projects/{idOrSlug}")
    public ResponseEntity<ApiResponse<ProjectDto>> getProject(@PathVariable String idOrSlug) {
        return ResponseEntity.ok(ApiResponse.ok(projectService.getProjectByIdOrSlug(idOrSlug)));
    }

    // --- Team ---
    @GetMapping("/team")
    public ResponseEntity<ApiResponse<List<TeamMemberDto>>> getTeam() {
        return ResponseEntity.ok(ApiResponse.ok(teamMemberService.getActiveTeamMembers()));
    }

    // --- Testimonials ---
    @GetMapping("/testimonials")
    public ResponseEntity<ApiResponse<List<TestimonialDto>>> getTestimonials() {
        return ResponseEntity.ok(ApiResponse.ok(testimonialService.getApprovedTestimonials()));
    }

    // --- Gallery ---
    @GetMapping("/gallery")
    public ResponseEntity<ApiResponse<List<GalleryImageDto>>> getGallery(
            @RequestParam(required = false) String category) {
        return ResponseEntity.ok(ApiResponse.ok(galleryService.getGalleryImages(category)));
    }

    // --- Blog ---
    @GetMapping("/blogs")
    public ResponseEntity<ApiResponse<List<BlogPostDto>>> getBlogs() {
        return ResponseEntity.ok(ApiResponse.ok(blogService.getPublishedPosts()));
    }

    @GetMapping("/blogs/recent")
    public ResponseEntity<ApiResponse<List<BlogPostDto>>> getRecentBlogs() {
        return ResponseEntity.ok(ApiResponse.ok(blogService.getRecentPosts()));
    }

    @GetMapping("/blogs/{slug}")
    public ResponseEntity<ApiResponse<BlogPostDto>> getBlogBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(ApiResponse.ok(blogService.getPostBySlug(slug)));
    }

    // --- FAQ ---
    @GetMapping("/faqs")
    public ResponseEntity<ApiResponse<List<FaqDto>>> getFaqs(
            @RequestParam(required = false) String category) {
        return ResponseEntity.ok(ApiResponse.ok(faqService.getActiveFaqs(category)));
    }

    // --- Careers / Jobs ---
    @GetMapping("/jobs")
    public ResponseEntity<ApiResponse<List<JobPostDto>>> getJobs() {
        return ResponseEntity.ok(ApiResponse.ok(jobService.getActiveJobs()));
    }

    @GetMapping("/jobs/{id}")
    public ResponseEntity<ApiResponse<JobPostDto>> getJob(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(jobService.getJobById(id)));
    }

    // --- Form Submissions ---

    @PostMapping("/quotes")
    public ResponseEntity<ApiResponse<QuoteRequestDto>> submitQuote(@Valid @RequestBody QuoteRequestDto dto) {
        QuoteRequestDto result = quoteRequestService.createQuoteRequest(dto);
        return ResponseEntity.ok(ApiResponse.ok(result, "Quote request submitted successfully. Our team will contact you shortly."));
    }

    @PostMapping("/contact")
    public ResponseEntity<ApiResponse<ContactEnquiryDto>> submitContact(@Valid @RequestBody ContactEnquiryDto dto) {
        ContactEnquiryDto result = contactEnquiryService.createEnquiry(dto);
        return ResponseEntity.ok(ApiResponse.ok(result, "Thank you for reaching out. We have received your message."));
    }

    @PostMapping(value = "/careers/apply", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<JobApplicationDto>> applyForJob(
            @RequestParam(required = false) Long jobPostId,
            @RequestParam String applicantName,
            @RequestParam String email,
            @RequestParam String phone,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String experienceYears,
            @RequestParam(required = false) String message,
            @RequestParam(required = false) MultipartFile resume) {

        JobApplicationDto app = jobService.submitApplication(
                jobPostId, applicantName, email, phone, location, experienceYears, message, resume
        );
        return ResponseEntity.ok(ApiResponse.ok(app, "Application submitted successfully!"));
    }

    @GetMapping("/settings")
    public ResponseEntity<ApiResponse<Map<String, String>>> getSettings() {
        return ResponseEntity.ok(ApiResponse.ok(siteSettingService.getAllSettings()));
    }
}
