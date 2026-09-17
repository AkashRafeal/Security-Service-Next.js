package com.securityservices.repository;

import com.securityservices.entity.QuoteRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface QuoteRequestRepository extends JpaRepository<QuoteRequest, Long> {
    List<QuoteRequest> findAllByOrderByCreatedAtDesc();
    List<QuoteRequest> findByStatusOrderByCreatedAtDesc(String status);
    long countByStatus(String status);

    @Query(value = "SELECT DATE_FORMAT(created_at, '%Y-%m') as month, COUNT(*) as count FROM quote_requests GROUP BY DATE_FORMAT(created_at, '%Y-%m') ORDER BY month DESC LIMIT 6", nativeQuery = true)
    List<Map<String, Object>> findMonthlyQuoteStats();
}
