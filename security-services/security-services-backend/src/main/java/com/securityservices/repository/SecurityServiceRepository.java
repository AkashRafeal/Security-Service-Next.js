package com.securityservices.repository;

import com.securityservices.entity.SecurityService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SecurityServiceRepository extends JpaRepository<SecurityService, Long> {
    Optional<SecurityService> findBySlug(String slug);
    List<SecurityService> findByIsActiveTrueOrderByDisplayOrderAsc();
    List<SecurityService> findByIsActiveTrueAndIsFeaturedTrueOrderByDisplayOrderAsc();
    Boolean existsBySlug(String slug);
    long countByIsActiveTrue();
}
