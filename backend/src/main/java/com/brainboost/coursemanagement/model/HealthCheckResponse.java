package com.brainboost.coursemanagement.model;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Data
public class HealthCheckResponse {
    private String status;
    private String component;
    private String message;
    private LocalDateTime timestamp;
    private Map<String, Object> details;

    public HealthCheckResponse() {
        this.timestamp = LocalDateTime.now();
        this.details = new HashMap<>();
    }

    public static HealthCheckResponse up(String component) {
        HealthCheckResponse response = new HealthCheckResponse();
        response.setStatus("UP");
        response.setComponent(component);
        response.setMessage("Component is healthy");
        return response;
    }

    public static HealthCheckResponse down(String component, String message) {
        HealthCheckResponse response = new HealthCheckResponse();
        response.setStatus("DOWN");
        response.setComponent(component);
        response.setMessage(message);
        return response;
    }

    public void addDetail(String key, Object value) {
        this.details.put(key, value);
    }
} 