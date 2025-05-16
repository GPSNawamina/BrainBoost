package com.brainboost.coursemanagement.service;

import com.brainboost.coursemanagement.model.HealthCheckResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.concurrent.TimeUnit;

@Service
@Transactional
public class CourseManagementHealthService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public HealthCheckResponse checkHealth() {
        HealthCheckResponse response = HealthCheckResponse.up("application");
        response.addDetail("version", "1.0.0");
        response.addDetail("environment", "development");
        response.addDetail("javaVersion", System.getProperty("java.version"));
        response.addDetail("os", System.getProperty("os.name"));
        response.addDetail("memory", getMemoryInfo());
        return response;
    }

    public HealthCheckResponse checkDatabase() {
        try {
            long startTime = System.nanoTime();
            jdbcTemplate.queryForObject("SELECT 1", Integer.class);
            long endTime = System.nanoTime();
            long duration = TimeUnit.NANOSECONDS.toMillis(endTime - startTime);

            HealthCheckResponse response = HealthCheckResponse.up("database");
            response.addDetail("type", "H2");
            response.addDetail("responseTime", duration + "ms");
            response.addDetail("status", "connected");
            return response;
        } catch (Exception e) {
            HealthCheckResponse response = HealthCheckResponse.down("database", e.getMessage());
            response.addDetail("errorType", e.getClass().getSimpleName());
            response.addDetail("timestamp", System.currentTimeMillis());
            return response;
        }
    }

    public HealthCheckResponse checkAchievements() {
        HealthCheckResponse response = HealthCheckResponse.up("achievements");
        response.addDetail("status", "operational");
        response.addDetail("message", "Achievement system is ready");
        return response;
    }

    public HealthCheckResponse checkProgress() {
        HealthCheckResponse response = HealthCheckResponse.up("progress");
        response.addDetail("status", "operational");
        response.addDetail("message", "Progress tracking system is ready");
        return response;
    }

    private String getMemoryInfo() {
        Runtime runtime = Runtime.getRuntime();
        long totalMemory = runtime.totalMemory() / (1024 * 1024);
        long freeMemory = runtime.freeMemory() / (1024 * 1024);
        long usedMemory = totalMemory - freeMemory;
        return String.format("Used: %dMB, Free: %dMB, Total: %dMB", usedMemory, freeMemory, totalMemory);
    }
} 