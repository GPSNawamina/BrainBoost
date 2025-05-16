package com.brainboost.learningprogress.controller;

import com.brainboost.learningprogress.model.Achievement;
import com.brainboost.learningprogress.service.AchievementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/achievements")
@CrossOrigin(origins = "http://localhost:3000")
public class AchievementController {

    @Autowired
    private AchievementService achievementService;

    @GetMapping
    public List<Achievement> getAllAchievements() {
        return achievementService.getAllAchievements();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Achievement> getAchievementById(@PathVariable Long id) {
        return achievementService.getAchievementById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/course/{courseId}")
    public List<Achievement> getAchievementsByCourseId(@PathVariable Long courseId) {
        return achievementService.getAchievementsByCourseId(courseId);
    }

    @PostMapping
    public Achievement createAchievement(@RequestBody Achievement achievement) {
        return achievementService.createAchievement(achievement);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Achievement> updateAchievement(
            @PathVariable Long id,
            @RequestBody Achievement achievementDetails) {
        try {
            Achievement updatedAchievement = achievementService.updateAchievement(id, achievementDetails);
            return ResponseEntity.ok(updatedAchievement);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAchievement(@PathVariable Long id) {
        try {
            achievementService.deleteAchievement(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}/progress")
    public ResponseEntity<Achievement> updateProgress(
            @PathVariable Long id,
            @RequestParam int progress) {
        try {
            Achievement updatedAchievement = achievementService.updateProgress(id, progress);
            return ResponseEntity.ok(updatedAchievement);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}