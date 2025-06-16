package com.brainboost.demo.repository;

import com.brainboost.demo.model.Course;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CourseRepository extends MongoRepository<Course,String> {
}
