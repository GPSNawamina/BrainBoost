package com.brainboost.demo.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@Document(collection = "courses")
public class Course {
    @Id
    private String id;
    private String name;
    private String description;
    private boolean enrolled;
    private double progress; // in percentage (0 to 100)
    private boolean completed;

    private List<Note> notes = new ArrayList<>();

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public boolean isEnrolled() {
        return enrolled;
    }

    public double getProgress() {
        return progress;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setEnrolled(boolean enrolled) {
        this.enrolled = enrolled;
    }

    public void setProgress(double progress) {
        this.progress = progress;
    }

    public List<Note> getNotes() { // ✅ Add this getter
        return notes;
    }

    public void setNotes(List<Note> notes) { // ✅ Add this setter
        this.notes = notes;
    }
}
