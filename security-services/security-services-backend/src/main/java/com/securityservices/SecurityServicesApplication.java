package com.securityservices;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class SecurityServicesApplication {

    public static void main(String[] args) {
        SpringApplication.run(SecurityServicesApplication.class, args);
    }
}
