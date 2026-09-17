package com.securityservices.service;

import com.securityservices.dto.BlogCategoryDto;
import com.securityservices.dto.BlogPostDto;
import com.securityservices.entity.BlogCategory;
import com.securityservices.entity.BlogPost;
import com.securityservices.entity.PostStatus;
import com.securityservices.exception.DuplicateResourceException;
import com.securityservices.exception.ResourceNotFoundException;
import com.securityservices.repository.BlogCategoryRepository;
import com.securityservices.repository.BlogPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BlogService {

    private final BlogPostRepository postRepository;
    private final BlogCategoryRepository categoryRepository;
    private final AuditLogService auditLogService;

    // --- Posts ---

    public List<BlogPostDto> getPublishedPosts() {
        return postRepository.findByStatusOrderByPublishedAtDesc(PostStatus.PUBLISHED).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public List<BlogPostDto> getRecentPosts() {
        return postRepository.findTop6ByStatusOrderByPublishedAtDesc(PostStatus.PUBLISHED).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public List<BlogPostDto> getAllPostsForAdmin() {
        return postRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public BlogPostDto getPostBySlug(String slug) {
        BlogPost post = postRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Blog post not found with slug: " + slug));

        post.setViewCount(post.getViewCount() + 1);
        postRepository.save(post);

        return mapToDto(post);
    }

    @Transactional
    public BlogPostDto createPost(BlogPostDto dto, String performedBy) {
        String slug = (dto.getSlug() != null && !dto.getSlug().isBlank()) ? dto.getSlug() : SecurityServiceManagementService.toSlug(dto.getTitle());
        if (postRepository.existsBySlug(slug)) {
            slug = slug + "-" + System.currentTimeMillis() % 10000;
        }

        BlogCategory category = null;
        if (dto.getCategoryId() != null) {
            category = categoryRepository.findById(dto.getCategoryId()).orElse(null);
        }

        PostStatus status = PostStatus.PUBLISHED;
        if (dto.getStatus() != null) {
            try {
                status = PostStatus.valueOf(dto.getStatus().toUpperCase());
            } catch (Exception ignored) {}
        }

        BlogPost post = BlogPost.builder()
                .title(dto.getTitle())
                .slug(slug)
                .excerpt(dto.getExcerpt())
                .content(dto.getContent())
                .featuredImageUrl(dto.getFeaturedImageUrl())
                .category(category)
                .authorName(dto.getAuthorName() != null ? dto.getAuthorName() : "Chief Security Officer")
                .status(status)
                .publishedAt(status == PostStatus.PUBLISHED ? LocalDateTime.now() : null)
                .tags(dto.getTags())
                .build();

        BlogPost saved = postRepository.save(post);
        auditLogService.log("BLOG_CREATE", performedBy, "BlogPost", saved.getId(), "Created post " + saved.getTitle(), null);
        return mapToDto(saved);
    }

    @Transactional
    public BlogPostDto updatePost(Long id, BlogPostDto dto, String performedBy) {
        BlogPost post = postRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + id));

        if (dto.getSlug() != null && !dto.getSlug().equalsIgnoreCase(post.getSlug()) && postRepository.existsBySlug(dto.getSlug())) {
            throw new DuplicateResourceException("Slug already exists: " + dto.getSlug());
        }

        if (dto.getCategoryId() != null) {
            BlogCategory category = categoryRepository.findById(dto.getCategoryId()).orElse(null);
            post.setCategory(category);
        }

        post.setTitle(dto.getTitle());
        if (dto.getSlug() != null && !dto.getSlug().isBlank()) {
            post.setSlug(dto.getSlug());
        }
        post.setExcerpt(dto.getExcerpt());
        post.setContent(dto.getContent());
        post.setFeaturedImageUrl(dto.getFeaturedImageUrl());
        if (dto.getAuthorName() != null) post.setAuthorName(dto.getAuthorName());
        if (dto.getTags() != null) post.setTags(dto.getTags());

        if (dto.getStatus() != null) {
            try {
                PostStatus newStatus = PostStatus.valueOf(dto.getStatus().toUpperCase());
                if (newStatus == PostStatus.PUBLISHED && post.getPublishedAt() == null) {
                    post.setPublishedAt(LocalDateTime.now());
                }
                post.setStatus(newStatus);
            } catch (Exception ignored) {}
        }

        BlogPost saved = postRepository.save(post);
        auditLogService.log("BLOG_UPDATE", performedBy, "BlogPost", saved.getId(), "Updated post " + saved.getTitle(), null);
        return mapToDto(saved);
    }

    @Transactional
    public void deletePost(Long id, String performedBy) {
        BlogPost post = postRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + id));
        postRepository.delete(post);
        auditLogService.log("BLOG_DELETE", performedBy, "BlogPost", id, "Deleted post " + post.getTitle(), null);
    }

    // --- Categories ---

    public List<BlogCategoryDto> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(this::mapCategoryToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public BlogCategoryDto createCategory(BlogCategoryDto dto, String performedBy) {
        String slug = (dto.getSlug() != null && !dto.getSlug().isBlank()) ? dto.getSlug() : SecurityServiceManagementService.toSlug(dto.getName());
        if (categoryRepository.existsBySlug(slug)) {
            slug = slug + "-" + System.currentTimeMillis() % 10000;
        }

        BlogCategory category = BlogCategory.builder()
                .name(dto.getName())
                .slug(slug)
                .description(dto.getDescription())
                .build();

        BlogCategory saved = categoryRepository.save(category);
        auditLogService.log("BLOG_CAT_CREATE", performedBy, "BlogCategory", saved.getId(), "Created blog category " + saved.getName(), null);
        return mapCategoryToDto(saved);
    }

    private BlogPostDto mapToDto(BlogPost p) {
        return BlogPostDto.builder()
                .id(p.getId())
                .title(p.getTitle())
                .slug(p.getSlug())
                .excerpt(p.getExcerpt())
                .content(p.getContent())
                .featuredImageUrl(p.getFeaturedImageUrl())
                .categoryId(p.getCategory() != null ? p.getCategory().getId() : null)
                .categoryName(p.getCategory() != null ? p.getCategory().getName() : null)
                .authorName(p.getAuthorName())
                .status(p.getStatus().name())
                .publishedAt(p.getPublishedAt())
                .viewCount(p.getViewCount())
                .tags(p.getTags())
                .createdAt(p.getCreatedAt())
                .build();
    }

    private BlogCategoryDto mapCategoryToDto(BlogCategory c) {
        return BlogCategoryDto.builder()
                .id(c.getId())
                .name(c.getName())
                .slug(c.getSlug())
                .description(c.getDescription())
                .build();
    }
}
