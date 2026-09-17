package com.securityservices.service;

import com.securityservices.exception.FileUploadException;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Slf4j
@Service
public class FileStorageService {

    @Value("${app.upload.dir:uploads}")
    private String uploadDir;

    private static final List<String> ALLOWED_IMAGE_EXTENSIONS = Arrays.asList(".jpg", ".jpeg", ".png", ".webp", ".svg");
    private static final List<String> ALLOWED_RESUME_EXTENSIONS = Arrays.asList(".pdf", ".doc", ".docx");

    private Path fileStorageLocation;

    @PostConstruct
    public void init() {
        this.fileStorageLocation = Paths.get(uploadDir).toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.fileStorageLocation);
            Files.createDirectories(this.fileStorageLocation.resolve("resumes"));
            Files.createDirectories(this.fileStorageLocation.resolve("images"));
        } catch (Exception ex) {
            throw new FileUploadException("Could not create directory where uploaded files will be stored: " + ex.getMessage());
        }
    }

    public String storeResume(MultipartFile file) {
        return storeFile(file, "resumes", ALLOWED_RESUME_EXTENSIONS);
    }

    public String storeImage(MultipartFile file) {
        return storeFile(file, "images", ALLOWED_IMAGE_EXTENSIONS);
    }

    private String storeFile(MultipartFile file, String subDir, List<String> allowedExtensions) {
        if (file == null || file.isEmpty()) {
            throw new FileUploadException("Cannot upload an empty file");
        }

        String originalFileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
        String lowerName = originalFileName.toLowerCase();

        boolean isAllowed = allowedExtensions.stream().anyMatch(lowerName::endsWith);
        if (!isAllowed) {
            throw new FileUploadException("Invalid file type. Allowed formats: " + String.join(", ", allowedExtensions));
        }

        try {
            if (originalFileName.contains("..")) {
                throw new FileUploadException("Filename contains invalid path sequence: " + originalFileName);
            }

            String extension = "";
            int i = originalFileName.lastIndexOf('.');
            if (i > 0) {
                extension = originalFileName.substring(i);
            }

            String uniqueFileName = UUID.randomUUID().toString() + extension;
            Path targetLocation = this.fileStorageLocation.resolve(subDir).resolve(uniqueFileName);

            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            return "/uploads/" + subDir + "/" + uniqueFileName;
        } catch (IOException ex) {
            log.error("Failed to store file: {}", ex.getMessage());
            throw new FileUploadException("Could not store file " + originalFileName + ". Please try again!");
        }
    }
}
