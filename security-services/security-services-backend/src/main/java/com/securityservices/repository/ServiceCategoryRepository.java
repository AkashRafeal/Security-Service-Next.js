package com.securityservices.repository;

import com.securityservices.entity.ServiceCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ServiceCategoryRepository extends JpaRepository<ServiceCategory, Long> {
    Optional<ServiceCategory> findBySlug(String slug);
    List<ServiceCategory> findByIsActiveTrueOrderByDisplayOrderAsc();
    Boolean existsBySlug(String slug);
}
