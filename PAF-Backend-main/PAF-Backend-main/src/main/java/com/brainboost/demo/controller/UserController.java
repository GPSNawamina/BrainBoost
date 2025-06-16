package com.brainboost.demo.controller;


import com.brainboost.demo.model.User;
import com.brainboost.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")  // Allow requests from any frontend
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.createUser(user));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateUser(@PathVariable String id, @RequestBody User user) {
        Optional<User> updatedUser = userService.updateUser(id, user);
        if (updatedUser.isPresent()) {
            return ResponseEntity.ok(updatedUser.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
        return ResponseEntity.ok("User deleted successfully");
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable String id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginRequest) {
        Optional<User> user = userService.loginUser(loginRequest.getEmail(), loginRequest.getPassword());
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(401).body("Invalid email or password");
        }
    }

    // ✅ Follow another user
    @PutMapping("/follow/{userId}/{followerId}")
    public ResponseEntity<?> followUser(@PathVariable String userId, @PathVariable String followerId) {
        Optional<User> followedUser = userService.followUser(userId, followerId);
        if (followedUser.isPresent()) {
            return ResponseEntity.ok("Followed successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // ✅ Get follower count
    @GetMapping("/{userId}/followers/count")
    public ResponseEntity<?> getFollowerCount(@PathVariable String userId) {
        int count = userService.getFollowerCount(userId);
        return ResponseEntity.ok(count);
    }

    // ✅ Optional: Get followers list
    @GetMapping("/{userId}/followers")
    public ResponseEntity<?> getFollowers(@PathVariable String userId) {
        Optional<User> user = userService.getUserById(userId);
        return user.map(value -> ResponseEntity.ok(value.getFollowers()))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/upload-profile-image/{id}")
    public ResponseEntity<?> uploadProfileImage(@PathVariable String id, @RequestParam("file") MultipartFile file) {
        try {
            String imageUrl = userService.uploadProfileImage(id, file);
            return ResponseEntity.ok("Image uploaded successfully: " + imageUrl);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to upload image");
        }
    }


}
