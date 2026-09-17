package com.securityservices.service;

import com.securityservices.dto.ContactEnquiryDto;
import com.securityservices.entity.ContactEnquiry;
import com.securityservices.entity.Notification;
import com.securityservices.exception.ResourceNotFoundException;
import com.securityservices.repository.ContactEnquiryRepository;
import com.securityservices.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ContactEnquiryService {

    private final ContactEnquiryRepository contactEnquiryRepository;
    private final NotificationRepository notificationRepository;
    private final AuditLogService auditLogService;

    @Transactional
    public ContactEnquiryDto createEnquiry(ContactEnquiryDto dto) {
        ContactEnquiry enquiry = ContactEnquiry.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .subject(dto.getSubject())
                .message(dto.getMessage())
                .status("NEW")
                .build();

        ContactEnquiry saved = contactEnquiryRepository.save(enquiry);

        // System notification
        notificationRepository.save(Notification.builder()
                .title("New Contact Enquiry from " + saved.getName())
                .message(saved.getSubject() != null ? saved.getSubject() : "Message from website contact form")
                .type("ENQUIRY")
                .targetRole("ROLE_ADMIN")
                .linkUrl("/admin/enquiries")
                .build());

        auditLogService.log("CONTACT_ENQUIRY_SUBMIT", saved.getName(), "ContactEnquiry", saved.getId(), "Submitted contact enquiry", null);
        return mapToDto(saved);
    }

    public List<ContactEnquiryDto> getAllEnquiries(String status) {
        List<ContactEnquiry> list;
        if (status != null && !status.isBlank() && !status.equalsIgnoreCase("ALL")) {
            list = contactEnquiryRepository.findByStatusOrderByCreatedAtDesc(status.toUpperCase());
        } else {
            list = contactEnquiryRepository.findAllByOrderByCreatedAtDesc();
        }
        return list.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Transactional
    public ContactEnquiryDto updateEnquiryStatus(Long id, String status, String internalNotes, String performedBy) {
        ContactEnquiry enquiry = contactEnquiryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contact enquiry not found with id: " + id));

        if (status != null && !status.isBlank()) {
            enquiry.setStatus(status.toUpperCase());
        }
        if (internalNotes != null) enquiry.setInternalNotes(internalNotes);

        ContactEnquiry saved = contactEnquiryRepository.save(enquiry);
        auditLogService.log("ENQUIRY_STATUS_UPDATE", performedBy, "ContactEnquiry", id, "Updated status to " + enquiry.getStatus(), null);
        return mapToDto(saved);
    }

    @Transactional
    public void deleteEnquiry(Long id, String performedBy) {
        ContactEnquiry enquiry = contactEnquiryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contact enquiry not found with id: " + id));
        contactEnquiryRepository.delete(enquiry);
        auditLogService.log("ENQUIRY_DELETE", performedBy, "ContactEnquiry", id, "Deleted contact enquiry", null);
    }

    private ContactEnquiryDto mapToDto(ContactEnquiry e) {
        return ContactEnquiryDto.builder()
                .id(e.getId())
                .name(e.getName())
                .email(e.getEmail())
                .phone(e.getPhone())
                .subject(e.getSubject())
                .message(e.getMessage())
                .status(e.getStatus())
                .internalNotes(e.getInternalNotes())
                .createdAt(e.getCreatedAt())
                .build();
    }
}
