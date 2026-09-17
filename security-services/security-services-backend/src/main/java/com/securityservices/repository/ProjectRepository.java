package com.securityservices.repository;

import com.securityservices.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    Optional<Project> findBySlug(String slug);
    List<Project> findByIsPublishedTrueOrderByDisplayOrderAsc();
    List<Project> findByIsPublishedTrueAndClientTypeIgnoreCase(String clientType);
    Boolean existsBySlug(String slug);
}
