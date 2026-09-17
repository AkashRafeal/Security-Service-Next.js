package com.securityservices.controller;

import com.securityservices.dto.*;
import com.securityservices.service.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminContentController {

    private final SecurityServiceManagementService serviceManagementService;
    private final IndustryService industryService;
    private final ClientService clientService;
    private final ProjectService projectService;
    private final TeamMemberService teamMemberService;
    private final TestimonialService testimonialService;
    private final GalleryService galleryService;
    private final BlogService blogService;
    private final FaqService faqService;

    // --- Services ---
    @GetMapping("/services")
    public ResponseEntity<ApiResponse<List<ServiceDto>>> getAllServices() {
        return ResponseEntity.ok(ApiResponse.ok(serviceManagementService.getAllAdminServices()));
    }

    @PostMapping("/services")
    public ResponseEntity<ApiResponse<ServiceDto>> createService(
            @Valid @RequestBody ServiceDto dto,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(ApiResponse.ok(serviceManagementService.createService(dto, userDetails.getUsername())));
    }

    @PutMapping("/services/{id}")
    public ResponseEntity<ApiResponse<ServiceDto>> updateService(
            @PathVariable Long id,
            @Valid @RequestBody ServiceDto dto,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(ApiResponse.ok(serviceManagementService.updateService(id, dto, userDetails.getUsername())));
    }

    @PatchMapping("/services/{id}/toggle-status")
    public ResponseEntity<ApiResponse<Void>> toggleServiceStatus(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        serviceManagementService.toggleServiceStatus(id, userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.ok(null, "Service status toggled"));
    }

    @DeleteMapping("/services/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteService(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        serviceManagementService.deleteService(id, userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.ok(null, "Service deleted"));
    }

    // --- Service Categories ---
    @GetMapping("/service-categories")
    public ResponseEntity<ApiResponse<List<ServiceCategoryDto>>> getAllCategories() {
        return ResponseEntity.ok(ApiResponse.ok(serviceManagementService.getAllCategories()));
    }

    @PostMapping("/service-categories")
    public ResponseEntity<ApiResponse<ServiceCategoryDto>> createCategory(
            @Valid @RequestBody ServiceCategoryDto dto,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(ApiResponse.ok(serviceManagementService.createCategory(dto, userDetails.getUsername())));
    }

    @PutMapping("/service-categories/{id}")
    public ResponseEntity<ApiResponse<ServiceCategoryDto>> updateCategory(
            @PathVariable Long id,
            @Valid @RequestBody ServiceCategoryDto dto,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(ApiResponse.ok(serviceManagementService.updateCategory(id, dto, userDetails.getUsername())));
    }

    @DeleteMapping("/service-categories/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteCategory(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        serviceManagementService.deleteCategory(id, userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.ok(null, "Category deleted"));
    }

    // --- Industries ---
    @GetMapping("/industries")
    public ResponseEntity<ApiResponse<List<IndustryDto>>> getAllIndustries() {
        return ResponseEntity.ok(ApiResponse.ok(industryService.getAllIndustries()));
    }

    @PostMapping("/industries")
    public ResponseEntity<ApiResponse<IndustryDto>> createIndustry(
            @Valid @RequestBody IndustryDto dto,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(ApiResponse.ok(industryService.createIndustry(dto, userDetails.getUsername())));
    }

    @PutMapping("/industries/{id}")
    public ResponseEntity<ApiResponse<IndustryDto>> updateIndustry(
            @PathVariable Long id,
            @Valid @RequestBody IndustryDto dto,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(ApiResponse.ok(industryService.updateIndustry(id, dto, userDetails.getUsername())));
    }

    @DeleteMapping("/industries/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteIndustry(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        industryService.deleteIndustry(id, userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.ok(null, "Industry deleted"));
    }

    // --- Clients ---
    @GetMapping("/clients")
    public ResponseEntity<ApiResponse<List<ClientDto>>> getAllClients() {
        return ResponseEntity.ok(ApiResponse.ok(clientService.getAllClients()));
    }

    @PostMapping("/clients")
    public ResponseEntity<ApiResponse<ClientDto>> createClient(
            @Valid @RequestBody ClientDto dto,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(ApiResponse.ok(clientService.createClient(dto, userDetails.getUsername())));
    }

    @PutMapping("/clients/{id}")
    public ResponseEntity<ApiResponse<ClientDto>> updateClient(
            @PathVariable Long id,
            @Valid @RequestBody ClientDto dto,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(ApiResponse.ok(clientService.updateClient(id, dto, userDetails.getUsername())));
    }

    @DeleteMapping("/clients/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteClient(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        clientService.deleteClient(id, userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.ok(null, "Client deleted"));
    }

    // --- Projects ---
    @GetMapping("/projects")
    public ResponseEntity<ApiResponse<List<ProjectDto>>> getAllProjects() {
        return ResponseEntity.ok(ApiResponse.ok(projectService.getAllProjects()));
    }

    @PostMapping("/projects")
    public ResponseEntity<ApiResponse<ProjectDto>> createProject(
            @Valid @RequestBody ProjectDto dto,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(ApiResponse.ok(projectService.createProject(dto, userDetails.getUsername())));
    }

    @PutMapping("/projects/{id}")
    public ResponseEntity<ApiResponse<ProjectDto>> updateProject(
            @PathVariable Long id,
            @Valid @RequestBody ProjectDto dto,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(ApiResponse.ok(projectService.updateProject(id, dto, userDetails.getUsername())));
    }

    @DeleteMapping("/projects/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteProject(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        projectService.deleteProject(id, userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.ok(null, "Project deleted"));
    }

    // --- Team Members ---
    @GetMapping("/team")
    public ResponseEntity<ApiResponse<List<TeamMemberDto>>> getAllTeam() {
        return ResponseEntity.ok(ApiResponse.ok(teamMemberService.getAllTeamMembers()));
    }

    @PostMapping("/team")
    public ResponseEntity<ApiResponse<TeamMemberDto>> createTeamMember(
            @Valid @RequestBody TeamMemberDto dto,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(ApiResponse.ok(teamMemberService.createTeamMember(dto, userDetails.getUsername())));
    }

    @PutMapping("/team/{id}")
    public ResponseEntity<ApiResponse<TeamMemberDto>> updateTeamMember(
            @PathVariable Long id,
            @Valid @RequestBody TeamMemberDto dto,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(ApiResponse.ok(teamMemberService.updateTeamMember(id, dto, userDetails.getUsername())));
    }

    @DeleteMapping("/team/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteTeamMember(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        teamMemberService.deleteTeamMember(id, userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.ok(null, "Team member deleted"));
    }

    // --- Testimonials ---
    @GetMapping("/testimonials")
    public ResponseEntity<ApiResponse<List<TestimonialDto>>> getAllTestimonials() {
        return ResponseEntity.ok(ApiResponse.ok(testimonialService.getAllTestimonials()));
    }

    @PostMapping("/testimonials")
    public ResponseEntity<ApiResponse<TestimonialDto>> createTestimonial(
            @Valid @RequestBody TestimonialDto dto,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(ApiResponse.ok(testimonialService.createTestimonial(dto, userDetails.getUsername())));
    }

    @PutMapping("/testimonials/{id}")
    public ResponseEntity<ApiResponse<TestimonialDto>> updateTestimonial(
            @PathVariable Long id,
            @Valid @RequestBody TestimonialDto dto,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(ApiResponse.ok(testimonialService.updateTestimonial(id, dto, userDetails.getUsername())));
    }

    @DeleteMapping("/testimonials/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteTestimonial(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        testimonialService.deleteTestimonial(id, userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.ok(null, "Testimonial deleted"));
    }

    // --- Gallery ---
    @GetMapping("/gallery")
    public ResponseEntity<ApiResponse<List<GalleryImageDto>>> getAllGallery() {
        return ResponseEntity.ok(ApiResponse.ok(galleryService.getGalleryImages(null)));
    }

    @PostMapping("/gallery")
    public ResponseEntity<ApiResponse<GalleryImageDto>> createGalleryImage(
            @Valid @RequestBody GalleryImageDto dto,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(ApiResponse.ok(galleryService.createImage(dto, userDetails.getUsername())));
    }

    @PutMapping("/gallery/{id}")
    public ResponseEntity<ApiResponse<GalleryImageDto>> updateGalleryImage(
            @PathVariable Long id,
            @Valid @RequestBody GalleryImageDto dto,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(ApiResponse.ok(galleryService.updateImage(id, dto, userDetails.getUsername())));
    }

    @DeleteMapping("/gallery/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteGalleryImage(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        galleryService.deleteImage(id, userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.ok(null, "Gallery image deleted"));
    }

    // --- Blog ---
    @GetMapping("/blogs")
    public ResponseEntity<ApiResponse<List<BlogPostDto>>> getAllBlogs() {
        return ResponseEntity.ok(ApiResponse.ok(blogService.getAllPostsForAdmin()));
    }

    @PostMapping("/blogs")
    public ResponseEntity<ApiResponse<BlogPostDto>> createBlog(
            @Valid @RequestBody BlogPostDto dto,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(ApiResponse.ok(blogService.createPost(dto, userDetails.getUsername())));
    }

    @PutMapping("/blogs/{id}")
    public ResponseEntity<ApiResponse<BlogPostDto>> updateBlog(
            @PathVariable Long id,
            @Valid @RequestBody BlogPostDto dto,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(ApiResponse.ok(blogService.updatePost(id, dto, userDetails.getUsername())));
    }

    @DeleteMapping("/blogs/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteBlog(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        blogService.deletePost(id, userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.ok(null, "Blog post deleted"));
    }

    @GetMapping("/blog-categories")
    public ResponseEntity<ApiResponse<List<BlogCategoryDto>>> getBlogCategories() {
        return ResponseEntity.ok(ApiResponse.ok(blogService.getAllCategories()));
    }

    @PostMapping("/blog-categories")
    public ResponseEntity<ApiResponse<BlogCategoryDto>> createBlogCategory(
            @Valid @RequestBody BlogCategoryDto dto,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(ApiResponse.ok(blogService.createCategory(dto, userDetails.getUsername())));
    }

    // --- FAQs ---
    @GetMapping("/faqs")
    public ResponseEntity<ApiResponse<List<FaqDto>>> getAllFaqs() {
        return ResponseEntity.ok(ApiResponse.ok(faqService.getAllFaqs()));
    }

    @PostMapping("/faqs")
    public ResponseEntity<ApiResponse<FaqDto>> createFaq(
            @Valid @RequestBody FaqDto dto,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(ApiResponse.ok(faqService.createFaq(dto, userDetails.getUsername())));
    }

    @PutMapping("/faqs/{id}")
    public ResponseEntity<ApiResponse<FaqDto>> updateFaq(
            @PathVariable Long id,
            @Valid @RequestBody FaqDto dto,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(ApiResponse.ok(faqService.updateFaq(id, dto, userDetails.getUsername())));
    }

    @DeleteMapping("/faqs/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteFaq(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        faqService.deleteFaq(id, userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.ok(null, "FAQ deleted"));
    }
}
