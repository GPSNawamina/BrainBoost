package com.brainboost.health;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthIndicator;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class CustomHealthIndicator implements HealthIndicator {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public Health health() {
        try {
            // Check database connection
            jdbcTemplate.queryForObject("SELECT 1", Integer.class);
            
            // Check memory usage
            Runtime runtime = Runtime.getRuntime();
            long totalMemory = runtime.totalMemory();
            long freeMemory = runtime.freeMemory();
            long usedMemory = totalMemory - freeMemory;
            double memoryUsagePercentage = (usedMemory * 100.0) / totalMemory;

            return Health.up()
                    .withDetail("database", "UP")
                    .withDetail("memoryUsage", String.format("%.2f%%", memoryUsagePercentage))
                    .withDetail("totalMemory", formatSize(totalMemory))
                    .withDetail("freeMemory", formatSize(freeMemory))
                    .withDetail("usedMemory", formatSize(usedMemory))
                    .build();
        } catch (Exception e) {
            return Health.down()
                    .withException(e)
                    .build();
        }
    }

    private String formatSize(long bytes) {
        if (bytes < 1024) return bytes + " B";
        int exp = (int) (Math.log(bytes) / Math.log(1024));
        String pre = "KMGTPE".charAt(exp-1) + "";
        return String.format("%.1f %sB", bytes / Math.pow(1024, exp), pre);
    }
} 