package com.brainboost.learningprogress.repository;

import com.brainboost.learningprogress.model.Achievement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AchievementRepository extends JpaRepository<Achievement, Long> {
    List<Achievement> findByCourseId(Long courseId);
}