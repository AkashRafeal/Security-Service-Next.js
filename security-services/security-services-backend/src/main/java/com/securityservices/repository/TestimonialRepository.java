package com.securityservices.repository;

import com.securityservices.entity.Testimonial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TestimonialRepository extends JpaRepository<Testimonial, Long> {
    List<Testimonial> findByIsApprovedTrueOrderByDisplayOrderAsc();
    List<Testimonial> findByIsApprovedTrueAndIsFeaturedTrueOrderByDisplayOrderAsc();
    long countByIsApprovedTrue();
}
