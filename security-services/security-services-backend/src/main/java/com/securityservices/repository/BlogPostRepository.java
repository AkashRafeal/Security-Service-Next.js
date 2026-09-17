package com.securityservices.repository;

import com.securityservices.entity.BlogPost;
import com.securityservices.entity.PostStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BlogPostRepository extends JpaRepository<BlogPost, Long> {
    Optional<BlogPost> findBySlug(String slug);
    List<BlogPost> findByStatusOrderByPublishedAtDesc(PostStatus status);
    List<BlogPost> findTop6ByStatusOrderByPublishedAtDesc(PostStatus status);
    Boolean existsBySlug(String slug);
    long countByStatus(PostStatus status);
}
