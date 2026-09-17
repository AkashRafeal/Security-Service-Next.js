package com.securityservices.service;

import com.securityservices.dto.ClientDto;
import com.securityservices.entity.Client;
import com.securityservices.exception.ResourceNotFoundException;
import com.securityservices.repository.ClientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClientService {

    private final ClientRepository clientRepository;
    private final AuditLogService auditLogService;

    public List<ClientDto> getActiveClients() {
        return clientRepository.findByIsActiveTrueOrderByDisplayOrderAsc().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public List<ClientDto> getAllClients() {
        return clientRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public ClientDto createClient(ClientDto dto, String performedBy) {
        Client client = Client.builder()
                .name(dto.getName())
                .category(dto.getCategory())
                .logoUrl(dto.getLogoUrl())
                .websiteUrl(dto.getWebsiteUrl())
                .isFeatured(Boolean.TRUE.equals(dto.getIsFeatured()))
                .displayOrder(dto.getDisplayOrder() != null ? dto.getDisplayOrder() : 0)
                .isActive(dto.getIsActive() == null || dto.getIsActive())
                .build();

        Client saved = clientRepository.save(client);
        auditLogService.log("CLIENT_CREATE", performedBy, "Client", saved.getId(), "Created client " + saved.getName(), null);
        return mapToDto(saved);
    }

    @Transactional
    public ClientDto updateClient(Long id, ClientDto dto, String performedBy) {
        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Client not found with id: " + id));

        client.setName(dto.getName());
        client.setCategory(dto.getCategory());
        client.setLogoUrl(dto.getLogoUrl());
        client.setWebsiteUrl(dto.getWebsiteUrl());
        if (dto.getIsFeatured() != null) client.setIsFeatured(dto.getIsFeatured());
        if (dto.getDisplayOrder() != null) client.setDisplayOrder(dto.getDisplayOrder());
        if (dto.getIsActive() != null) client.setIsActive(dto.getIsActive());

        Client saved = clientRepository.save(client);
        auditLogService.log("CLIENT_UPDATE", performedBy, "Client", saved.getId(), "Updated client " + saved.getName(), null);
        return mapToDto(saved);
    }

    @Transactional
    public void deleteClient(Long id, String performedBy) {
        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Client not found with id: " + id));
        clientRepository.delete(client);
        auditLogService.log("CLIENT_DELETE", performedBy, "Client", id, "Deleted client " + client.getName(), null);
    }

    private ClientDto mapToDto(Client client) {
        return ClientDto.builder()
                .id(client.getId())
                .name(client.getName())
                .category(client.getCategory())
                .logoUrl(client.getLogoUrl())
                .websiteUrl(client.getWebsiteUrl())
                .isFeatured(client.getIsFeatured())
                .displayOrder(client.getDisplayOrder())
                .isActive(client.getIsActive())
                .build();
    }
}
