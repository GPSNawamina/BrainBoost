package com.brainboost.demo.controller;

import com.brainboost.demo.model.Course;
import com.brainboost.demo.model.Note;
import com.brainboost.demo.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "*") // Allow React to call API
public class CourseController {
    @Autowired
    private CourseService courseService;

    @GetMapping
    public List<Course> getAllCourses() {
        return courseService.getAllCourses();
    }

    @GetMapping("/{id}")
    public Course getCourseById(@PathVariable String id) {
        return courseService.getCourseById(id).orElse(null);
    }

    @PostMapping
    public Course addCourse(@RequestBody Course course) {
        return courseService.addCourse(course);
    }

    @PutMapping("/{id}")
    public Course updateCourse(@PathVariable String id, @RequestBody Course course) {
        return courseService.updateCourse(id, course);
    }

    @DeleteMapping("/{id}")
    public void deleteCourse(@PathVariable String id) {
        courseService.deleteCourse(id);
    }

    @PutMapping("/enroll/{id}")
    public Course enrollCourse(@PathVariable String id) {
        return courseService.enrollCourse(id);
    }

    @PutMapping("/progress/{id}")
    public Course updateProgress(@PathVariable String id, @RequestParam double progress) {
        return courseService.updateProgress(id, progress);
    }

    // ✅ Add a new daily tracking note
    @PostMapping("/{id}/notes")
    public Course addNote(@PathVariable String id, @RequestBody Note note) {
        return courseService.addNoteToCourse(id, note);
    }

    // ✅ Toggle note completion (e.g., mark as done/undone)
    @PutMapping("/{id}/notes/{index}/toggle")
    public Course toggleNoteCompletion(@PathVariable String id, @PathVariable int index) {
        return courseService.toggleNoteCompletion(id, index);
    }
    @DeleteMapping("/{id}/notes/{index}")
    public Course deleteNote(@PathVariable String id, @PathVariable int index) {
        return courseService.deleteNote(id, index);
    }

}
