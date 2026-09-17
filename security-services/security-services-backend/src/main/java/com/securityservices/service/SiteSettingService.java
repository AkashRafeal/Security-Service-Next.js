package com.securityservices.service;

import com.securityservices.entity.SiteSetting;
import com.securityservices.repository.SiteSettingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class SiteSettingService {

    private final SiteSettingRepository settingRepository;
    private final AuditLogService auditLogService;

    public Map<String, String> getAllSettings() {
        Map<String, String> map = new HashMap<>();
        List<SiteSetting> list = settingRepository.findAll();
        for (SiteSetting s : list) {
            map.put(s.getSettingKey(), s.getSettingValue());
        }
        return map;
    }

    @Transactional
    public void updateSettings(Map<String, String> settingsMap, String performedBy) {
        for (Map.Entry<String, String> entry : settingsMap.entrySet()) {
            SiteSetting setting = settingRepository.findBySettingKey(entry.getKey())
                    .orElse(SiteSetting.builder()
                            .settingKey(entry.getKey())
                            .groupName("GENERAL")
                            .build());

            setting.setSettingValue(entry.getValue());
            settingRepository.save(setting);
        }
        auditLogService.log("SETTINGS_UPDATE", performedBy, "SiteSetting", null, "Updated website configurations", null);
    }
}
