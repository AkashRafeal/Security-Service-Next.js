package com.securityservices.service;

import com.securityservices.dto.QuoteRequestDto;
import com.securityservices.entity.Notification;
import com.securityservices.entity.QuoteRequest;
import com.securityservices.exception.ResourceNotFoundException;
import com.securityservices.repository.NotificationRepository;
import com.securityservices.repository.QuoteRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuoteRequestService {

    private final QuoteRequestRepository quoteRequestRepository;
    private final NotificationRepository notificationRepository;
    private final AuditLogService auditLogService;

    @Transactional
    public QuoteRequestDto createQuoteRequest(QuoteRequestDto dto) {
        String quoteNumber = "QT-" + System.currentTimeMillis() % 100000 + "-" + (100 + new Random().nextInt(900));

        QuoteRequest entity = QuoteRequest.builder()
                .quoteNumber(quoteNumber)
                .name(dto.getName())
                .company(dto.getCompany())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .serviceRequired(dto.getServiceRequired())
                .location(dto.getLocation())
                .numberOfGuardsRequired(dto.getNumberOfGuardsRequired())
                .startDate(dto.getStartDate())
                .duration(dto.getDuration())
                .securityRequirements(dto.getSecurityRequirements())
                .message(dto.getMessage())
                .status("NEW")
                .build();

        QuoteRequest saved = quoteRequestRepository.save(entity);

        // Create alert notification for admin team
        notificationRepository.save(Notification.builder()
                .title("New Quote Request: " + saved.getQuoteNumber())
                .message("Quote request submitted by " + saved.getName() + " (" + saved.getCompany() + ") for " + saved.getServiceRequired())
                .type("QUOTE")
                .targetRole("ROLE_ADMIN")
                .linkUrl("/admin/quotes")
                .build());

        auditLogService.log("QUOTE_REQUEST_SUBMIT", saved.getName(), "QuoteRequest", saved.getId(), "Submitted quote " + saved.getQuoteNumber(), null);
        return mapToDto(saved);
    }

    public List<QuoteRequestDto> getAllQuotes(String status) {
        List<QuoteRequest> list;
        if (status != null && !status.isBlank() && !status.equalsIgnoreCase("ALL")) {
            list = quoteRequestRepository.findByStatusOrderByCreatedAtDesc(status.toUpperCase());
        } else {
            list = quoteRequestRepository.findAllByOrderByCreatedAtDesc();
        }
        return list.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public QuoteRequestDto getQuoteById(Long id) {
        QuoteRequest entity = quoteRequestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Quote request not found with id: " + id));
        return mapToDto(entity);
    }

    @Transactional
    public QuoteRequestDto updateQuoteStatus(Long id, String status, String internalNotes, Double quotedAmount, String assignedStaffName, String performedBy) {
        QuoteRequest entity = quoteRequestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Quote request not found with id: " + id));

        if (status != null && !status.isBlank()) {
            entity.setStatus(status.toUpperCase());
        }
        if (internalNotes != null) entity.setInternalNotes(internalNotes);
        if (quotedAmount != null) entity.setQuotedAmount(quotedAmount);
        if (assignedStaffName != null) entity.setAssignedStaffName(assignedStaffName);

        QuoteRequest saved = quoteRequestRepository.save(entity);
        auditLogService.log("QUOTE_STATUS_UPDATE", performedBy, "QuoteRequest", id, "Updated status to " + entity.getStatus(), null);
        return mapToDto(saved);
    }

    private QuoteRequestDto mapToDto(QuoteRequest q) {
        return QuoteRequestDto.builder()
                .id(q.getId())
                .quoteNumber(q.getQuoteNumber())
                .name(q.getName())
                .company(q.getCompany())
                .email(q.getEmail())
                .phone(q.getPhone())
                .serviceRequired(q.getServiceRequired())
                .location(q.getLocation())
                .numberOfGuardsRequired(q.getNumberOfGuardsRequired())
                .startDate(q.getStartDate())
                .duration(q.getDuration())
                .securityRequirements(q.getSecurityRequirements())
                .message(q.getMessage())
                .status(q.getStatus())
                .internalNotes(q.getInternalNotes())
                .quotedAmount(q.getQuotedAmount())
                .assignedStaffName(q.getAssignedStaffName())
                .createdAt(q.getCreatedAt())
                .build();
    }
}
