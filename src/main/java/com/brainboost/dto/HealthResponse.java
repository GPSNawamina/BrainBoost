package com.brainboost.dto;

import lombok.Data;
import java.util.Map;

@Data
public class HealthResponse {
    private String status;
    private Map<String, Object> components;
    private long timestamp;

    public HealthResponse(String status, Map<String, Object> components) {
        this.status = status;
        this.components = components;
        this.timestamp = System.currentTimeMillis();
    }
} 