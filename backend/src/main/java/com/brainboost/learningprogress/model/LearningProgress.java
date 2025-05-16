package com.brainboost.learningprogress.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Table(name = "learning_progress")
public class LearningProgress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "course_id", nullable = false)
    private Long courseId;

    @Column(nullable = false)
    private int progress;

    @Column(nullable = false)
    private int totalModules;

    @Column(name = "completion_percentage")
    private double completionPercentage;

    @ElementCollection
    @CollectionTable(name = "learning_progress_achievements", 
        joinColumns = @JoinColumn(name = "progress_id"))
    @Column(name = "achievement_id")
    private List<Long> achievementIds = new ArrayList<>();

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}