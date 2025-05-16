package com.brainboost;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories(basePackages = {
    "com.brainboost.coursemanagement.repository",
    "com.brainboost.learningprogress.repository"
})
public class BrainBoostApplication {
    public static void main(String[] args) {
        SpringApplication.run(BrainBoostApplication.class, args);
    }
}