package com.brainboost.controller;

import com.brainboost.dto.HealthResponse;
import com.brainboost.service.HealthCheckService;
import com.brainboost.coursemanagement.model.HealthCheckResponse;
import com.brainboost.coursemanagement.service.CourseManagementHealthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/health")
public class HealthController {

    @Autowired
    private HealthCheckService healthCheckService;

    @Autowired
    private CourseManagementHealthService courseManagementHealthService;

    @GetMapping
    public ResponseEntity<HealthResponse> health() {
        return ResponseEntity.ok(healthCheckService.checkHealth());
    }

    @GetMapping("/ping")
    public ResponseEntity<String> ping() {
        return ResponseEntity.ok("pong");
    }

    @GetMapping("/course-management")
    public ResponseEntity<HealthCheckResponse> checkCourseManagementHealth() {
        HealthCheckResponse response = courseManagementHealthService.checkHealth();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/database")
    public ResponseEntity<HealthCheckResponse> checkDatabase() {
        HealthCheckResponse response = courseManagementHealthService.checkDatabase();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/achievements")
    public ResponseEntity<HealthCheckResponse> checkAchievements() {
        HealthCheckResponse response = courseManagementHealthService.checkAchievements();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/progress")
    public ResponseEntity<HealthCheckResponse> checkProgress() {
        HealthCheckResponse response = courseManagementHealthService.checkProgress();
        return ResponseEntity.ok(response);
    }
} 