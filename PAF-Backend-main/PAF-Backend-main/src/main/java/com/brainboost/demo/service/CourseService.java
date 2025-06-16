package com.brainboost.demo.service;

import com.brainboost.demo.model.Course;
import com.brainboost.demo.model.Note;
import com.brainboost.demo.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Optional<Course> getCourseById(String id) {
        return courseRepository.findById(id);
    }

    public Course addCourse(Course course) {
        course.setEnrolled(false);
        course.setProgress(0);
        course.setCompleted(false);
        return courseRepository.save(course);
    }

    public Course updateCourse(String id, Course updatedCourse) {
        return courseRepository.findById(id)
            .map(course -> {
                course.setName(updatedCourse.getName());
                course.setDescription(updatedCourse.getDescription());
                return courseRepository.save(course);
            }).orElse(null);
    }

    public void deleteCourse(String id) {
        courseRepository.deleteById(id);
    }

    public Course enrollCourse(String id) {
        return courseRepository.findById(id)
            .map(course -> {
                course.setEnrolled(true);
                course.setProgress(0);
                course.setCompleted(false);
                return courseRepository.save(course);
            }).orElse(null);
    }

    public Course updateProgress(String id, double progress) {
        return courseRepository.findById(id)
            .map(course -> {
                course.setProgress(progress);
                if (progress >= 100.0) {
                    course.setCompleted(true);
                }
                return courseRepository.save(course);
            }).orElse(null);
    }

    // ✅ Add daily tracking note
    public Course addNoteToCourse(String id, Note note) {
        return courseRepository.findById(id)
            .map(course -> {
                course.getNotes().add(note);
                return courseRepository.save(course);
            }).orElse(null);
    }

    // ✅ Toggle note completion (mark as done/undone)
    public Course toggleNoteCompletion(String id, int index) {
        return courseRepository.findById(id)
            .map(course -> {
                List<Note> notes = course.getNotes();
                if (index >= 0 && index < notes.size()) {
                    Note note = notes.get(index);
                    note.setDone(!note.isDone());
                }
                return courseRepository.save(course);
            }).orElse(null);
    }

    public Course deleteNote(String courseId, int index) {
        return courseRepository.findById(courseId)
                .map(course -> {
                    List<Note> notes = course.getNotes();
                    if (index >= 0 && index < notes.size()) {
                        notes.remove(index);
                        course.setNotes(notes);
                        return courseRepository.save(course);
                    }
                    return null;
                })
                .orElse(null);
    }

}
