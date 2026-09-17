package com.securityservices.repository;

import com.securityservices.entity.ContactEnquiry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface ContactEnquiryRepository extends JpaRepository<ContactEnquiry, Long> {
    List<ContactEnquiry> findAllByOrderByCreatedAtDesc();
    List<ContactEnquiry> findByStatusOrderByCreatedAtDesc(String status);
    long countByStatus(String status);

    @Query(value = "SELECT DATE_FORMAT(created_at, '%Y-%m') as month, COUNT(*) as count FROM contact_enquiries GROUP BY DATE_FORMAT(created_at, '%Y-%m') ORDER BY month DESC LIMIT 6", nativeQuery = true)
    List<Map<String, Object>> findMonthlyEnquiryStats();
}
