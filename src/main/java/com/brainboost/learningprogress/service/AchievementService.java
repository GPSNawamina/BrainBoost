package com.brainboost.learningprogress.service;

import com.brainboost.learningprogress.model.Achievement;
import com.brainboost.learningprogress.model.LearningProgress;
import com.brainboost.learningprogress.repository.AchievementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@Transactional
public class AchievementService {

    @Autowired
    private AchievementRepository achievementRepository;

    public List<Achievement> getAllAchievements() {
        return achievementRepository.findAll();
    }

    public Optional<Achievement> getAchievementById(Long id) {
        return achievementRepository.findById(id);
    }

    public List<Achievement> getAchievementsByCourseId(Long courseId) {
        return achievementRepository.findByCourseId(courseId);
    }

    public Achievement createAchievement(Achievement achievement) {
        return achievementRepository.save(achievement);
    }

    public Achievement updateAchievement(Long id, Achievement achievementDetails) {
        return achievementRepository.findById(id)
                .map(existingAchievement -> {
                    existingAchievement.setTitle(achievementDetails.getTitle());
                    existingAchievement.setDescription(achievementDetails.getDescription());
                    existingAchievement.setProgress(achievementDetails.getProgress());
                    existingAchievement.setTarget(achievementDetails.getTarget());
                    existingAchievement.setCourseId(achievementDetails.getCourseId());
                    existingAchievement.setActive(achievementDetails.isActive());
                    return achievementRepository.save(existingAchievement);
                })
                .orElseThrow(() -> new RuntimeException("Achievement not found with id: " + id));
    }

    public void deleteAchievement(Long id) {
        achievementRepository.deleteById(id);
    }

    public Achievement updateProgress(Long id, int progress) {
        return achievementRepository.findById(id)
                .map(achievement -> {
                    achievement.setProgress(progress);
                    return achievementRepository.save(achievement);
                })
                .orElseThrow(() -> new RuntimeException("Achievement not found with id: " + id));
    }

    public LearningProgress checkAndAwardAchievements(LearningProgress progress) {
        // Verify progress has valid course ID
        if (progress.getCourseId() == null) {
            return progress;
        }

        // Get achievements for the course
        List<Achievement> achievements = achievementRepository.findByCourseId(progress.getCourseId());

        // Ensure achievementIds list exists
        if (progress.getAchievementIds() == null) {
            progress.setAchievementIds(new ArrayList<>());
        }

        // Check and award achievements
        achievements.forEach(achievement -> {
            if (shouldAwardAchievement(progress, achievement)) {
                if (!progress.getAchievementIds().contains(achievement.getId())) {
                    progress.getAchievementIds().add(achievement.getId());
                }
            }
        });

        return progress;
    }

    private boolean shouldAwardAchievement(LearningProgress progress, Achievement achievement) {
        // Award if completion percentage meets or exceeds target and achievement is active
        return progress.getCompletionPercentage() >= achievement.getTarget()
                && achievement.isActive()
                && Objects.equals(progress.getCourseId(), achievement.getCourseId());
    }
}