package com.brainboost.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Document(collection = "users")
@Data
public class User {
    @Id
    private String id;
    private String name;
    private String phone;
    private String bio;
    private String email;
    private String password;

    // ✅ Followers list (stores user IDs of followers)
    private Set<String> followers = new HashSet<>();

    private String profileImageUrl;
}
