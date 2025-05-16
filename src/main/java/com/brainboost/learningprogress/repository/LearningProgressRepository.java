package com.brainboost.learningprogress.repository;

import com.brainboost.learningprogress.model.LearningProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface LearningProgressRepository extends JpaRepository<LearningProgress, Long> {
    List<LearningProgress> findByUserId(Long userId);
    Optional<LearningProgress> findByUserIdAndCourseId(Long userId, Long courseId);
    List<LearningProgress> findByCourseId(Long courseId);
}