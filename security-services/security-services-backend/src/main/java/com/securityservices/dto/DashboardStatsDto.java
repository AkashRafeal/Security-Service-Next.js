package com.securityservices.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsDto {
    private long totalEnquiries;
    private long pendingEnquiries;
    private long totalQuotes;
    private long pendingQuotes;
    private long totalApplications;
    private long pendingApplications;
    private long activeServices;
    private long totalBlogPosts;
    private long totalTestimonials;
    private long totalClients;
    private long totalProjects;

    private List<Map<String, Object>> enquiriesByMonth;
    private List<Map<String, Object>> quotesByMonth;
    private Map<String, Long> quoteStatusDistribution;
    private Map<String, Long> enquiryStatusDistribution;
    private List<Map<String, Object>> serviceDemand;
}
