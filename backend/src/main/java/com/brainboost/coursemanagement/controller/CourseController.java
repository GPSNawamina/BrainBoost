package com.brainboost.coursemanagement.controller;

import com.brainboost.coursemanagement.model.Course;
import com.brainboost.coursemanagement.model.User;
import com.brainboost.coursemanagement.repository.CourseRepository;
import com.brainboost.coursemanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "http://localhost:3000")
public class CourseController {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable String id) {
        return courseRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Course> createCourse(@RequestBody Course course) {
        Course savedCourse = courseRepository.save(course);
        return ResponseEntity.ok(savedCourse);
    }

    @PostMapping("/{courseId}/enroll")
    public ResponseEntity<?> enrollInCourse(@PathVariable String courseId, Authentication authentication) {
        String userEmail = authentication.getName();
        
        return userRepository.findByEmail(userEmail)
                .map(user -> {
                    Course course = courseRepository.findById(courseId)
                            .orElse(null);
                    
                    if (course == null) {
                        return ResponseEntity.notFound().build();
                    }
                    
                    if (course.getEnrolledUserIds().contains(user.getId().toString())) {
                        return ResponseEntity.badRequest().body("Already enrolled in this course");
                    }
                    
                    course.getEnrolledUserIds().add(user.getId().toString());
                    courseRepository.save(course);
                    
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.badRequest().body("User not found"));
    }
}