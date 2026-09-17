package com.securityservices.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BlogPostDto {
    private Long id;

    @NotBlank(message = "Title is required")
    private String title;

    private String slug;
    private String excerpt;

    @NotBlank(message = "Content is required")
    private String content;

    private String featuredImageUrl;
    private Long categoryId;
    private String categoryName;
    private String authorName;
    private String status;
    private LocalDateTime publishedAt;
    private Long viewCount;
    private String tags;
    private LocalDateTime createdAt;
}
