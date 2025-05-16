package com.brainboost.service;

import com.brainboost.dto.HealthResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthIndicator;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class HealthCheckService implements HealthIndicator {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public Health health() {
        try {
            // Check database connection
            jdbcTemplate.queryForObject("SELECT 1", Integer.class);
            
            Map<String, Object> details = new HashMap<>();
            details.put("database", "UP");
            details.put("timestamp", System.currentTimeMillis());
            
            // Add memory information
            Runtime runtime = Runtime.getRuntime();
            details.put("memory", Map.of(
                "total", runtime.totalMemory(),
                "free", runtime.freeMemory(),
                "used", runtime.totalMemory() - runtime.freeMemory()
            ));
            
            return Health.up().withDetails(details).build();
        } catch (Exception e) {
            Map<String, Object> errorDetails = new HashMap<>();
            errorDetails.put("error", e.getMessage());
            errorDetails.put("database", "DOWN");
            errorDetails.put("timestamp", System.currentTimeMillis());
            return Health.down().withDetails(errorDetails).build();
        }
    }

    public HealthResponse checkHealth() {
        Health health = health();
        return new HealthResponse(
            health.getStatus().getCode(),
            health.getDetails()
        );
    }
} 