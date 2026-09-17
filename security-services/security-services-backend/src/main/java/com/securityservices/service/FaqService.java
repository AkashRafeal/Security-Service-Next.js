package com.securityservices.service;

import com.securityservices.dto.FaqDto;
import com.securityservices.entity.Faq;
import com.securityservices.exception.ResourceNotFoundException;
import com.securityservices.repository.FaqRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FaqService {

    private final FaqRepository faqRepository;
    private final AuditLogService auditLogService;

    public List<FaqDto> getActiveFaqs(String category) {
        List<Faq> list;
        if (category != null && !category.isBlank() && !category.equalsIgnoreCase("All")) {
            list = faqRepository.findByCategoryIgnoreCaseAndIsActiveTrueOrderByDisplayOrderAsc(category);
        } else {
            list = faqRepository.findByIsActiveTrueOrderByDisplayOrderAsc();
        }
        return list.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public List<FaqDto> getAllFaqs() {
        return faqRepository.findAll().stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Transactional
    public FaqDto createFaq(FaqDto dto, String performedBy) {
        Faq faq = Faq.builder()
                .question(dto.getQuestion())
                .answer(dto.getAnswer())
                .category(dto.getCategory() != null ? dto.getCategory() : "General")
                .displayOrder(dto.getDisplayOrder() != null ? dto.getDisplayOrder() : 0)
                .isActive(dto.getIsActive() == null || dto.getIsActive())
                .build();

        Faq saved = faqRepository.save(faq);
        auditLogService.log("FAQ_CREATE", performedBy, "Faq", saved.getId(), "Created FAQ " + saved.getQuestion(), null);
        return mapToDto(saved);
    }

    @Transactional
    public FaqDto updateFaq(Long id, FaqDto dto, String performedBy) {
        Faq faq = faqRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("FAQ not found with id: " + id));

        faq.setQuestion(dto.getQuestion());
        faq.setAnswer(dto.getAnswer());
        if (dto.getCategory() != null) faq.setCategory(dto.getCategory());
        if (dto.getDisplayOrder() != null) faq.setDisplayOrder(dto.getDisplayOrder());
        if (dto.getIsActive() != null) faq.setIsActive(dto.getIsActive());

        Faq saved = faqRepository.save(faq);
        auditLogService.log("FAQ_UPDATE", performedBy, "Faq", saved.getId(), "Updated FAQ " + saved.getQuestion(), null);
        return mapToDto(saved);
    }

    @Transactional
    public void deleteFaq(Long id, String performedBy) {
        Faq faq = faqRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("FAQ not found with id: " + id));
        faqRepository.delete(faq);
        auditLogService.log("FAQ_DELETE", performedBy, "Faq", id, "Deleted FAQ " + faq.getQuestion(), null);
    }

    private FaqDto mapToDto(Faq f) {
        return FaqDto.builder()
                .id(f.getId())
                .question(f.getQuestion())
                .answer(f.getAnswer())
                .category(f.getCategory())
                .displayOrder(f.getDisplayOrder())
                .isActive(f.getIsActive())
                .build();
    }
}
