package com.brainboost.coursemanagement.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import java.util.HashSet;
import java.util.Set;

@Document(collection = "courses")
@Data
public class Course {
    @Id
    private String id;

    private String title;
    private String description;
    private String instructor;
    private Double price;
    private Set<String> enrolledUserIds = new HashSet<>();
    private boolean isActive = true;
}