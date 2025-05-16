package com.brainboost.learningprogress.controller;

import com.brainboost.learningprogress.model.LearningProgress;
import com.brainboost.learningprogress.model.ProgressUpdate;
import com.brainboost.learningprogress.repository.LearningProgressRepository;
import com.brainboost.learningprogress.service.AchievementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/progress")
@CrossOrigin(origins = "http://localhost:3000")
public class LearningProgressController {

    @Autowired
    private LearningProgressRepository learningProgressRepository;

    @Autowired
    private AchievementService achievementService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<LearningProgress>> getUserProgress(@PathVariable Long userId) {
        List<LearningProgress> progressList = learningProgressRepository.findByUserId(userId);
        return ResponseEntity.ok(progressList);
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<LearningProgress>> getCourseProgress(@PathVariable Long courseId) {
        List<LearningProgress> progressList = learningProgressRepository.findByCourseId(courseId);
        return ResponseEntity.ok(progressList);
    }

    @GetMapping("/user/{userId}/course/{courseId}")
    public ResponseEntity<LearningProgress> getUserCourseProgress(
            @PathVariable Long userId,
            @PathVariable Long courseId) {
        return learningProgressRepository.findByUserIdAndCourseId(userId, courseId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/user/{userId}/course/{courseId}/update")
    public ResponseEntity<LearningProgress> addProgressUpdate(
            @PathVariable Long userId,
            @PathVariable Long courseId,
            @RequestBody ProgressUpdate update) {
        LearningProgress progress = learningProgressRepository
                .findByUserIdAndCourseId(userId, courseId)
                .orElseGet(() -> {
                    LearningProgress newProgress = new LearningProgress();
                    newProgress.setUserId(userId);
                    newProgress.setCourseId(courseId);
                    newProgress.setProgress(0);
                    newProgress.setTotalModules(update.getTotalModules());
                    newProgress.setCompletionPercentage(0.0);
                    return newProgress;
                });

        // Update progress
        progress.setProgress(progress.getProgress() + 1);
        progress.setCompletionPercentage(
            (double) progress.getProgress() / progress.getTotalModules() * 100
        );

        // Check and award achievements
        progress = achievementService.checkAndAwardAchievements(progress);
        return ResponseEntity.ok(learningProgressRepository.save(progress));
    }

    @PutMapping("/user/{userId}/course/{courseId}")
    public ResponseEntity<LearningProgress> updateProgress(
            @PathVariable Long userId,
            @PathVariable Long courseId,
            @RequestBody LearningProgress updatedProgress) {
        return learningProgressRepository.findByUserIdAndCourseId(userId, courseId)
                .map(existingProgress -> {
                    // Update existing entity with new values
                    existingProgress.setProgress(updatedProgress.getProgress());
                    existingProgress.setTotalModules(updatedProgress.getTotalModules());
                    existingProgress.setCompletionPercentage(updatedProgress.getCompletionPercentage());

                    // Check for achievements
                    existingProgress = achievementService.checkAndAwardAchievements(existingProgress);

                    return ResponseEntity.ok(learningProgressRepository.save(existingProgress));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/user/{userId}/course/{courseId}")
    public ResponseEntity<Void> deleteProgress(
            @PathVariable Long userId,
            @PathVariable Long courseId) {
        return learningProgressRepository.findByUserIdAndCourseId(userId, courseId)
                .map(progress -> {
                    learningProgressRepository.delete(progress);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}