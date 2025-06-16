package com.brainboost.demo.service;


import com.brainboost.demo.model.User;
import com.brainboost.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User createUser(User user) {
        // followers will be initialized as empty automatically
        return userRepository.save(user);
    }

    public Optional<User> updateUser(String id, User updatedUser) {
        return userRepository.findById(id).map(user -> {
            user.setName(updatedUser.getName());
            user.setPhone(updatedUser.getPhone());
            user.setBio(updatedUser.getBio());
            user.setEmail(updatedUser.getEmail());
            user.setPassword(updatedUser.getPassword());
            return userRepository.save(user);
        });
    }

    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }

    public Optional<User> getUserById(String id) {
        return userRepository.findById(id);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // ✅ Login method
    public Optional<User> loginUser(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password);
    }

    // ✅ Follow another user
    public Optional<User> followUser(String userId, String followerId) {
        return userRepository.findById(userId).map(user -> {
            user.getFollowers().add(followerId); // Add follower ID to the set
            return userRepository.save(user);
        });
    }

    // ✅ Get follower count (Optional helper method)
    public int getFollowerCount(String userId) {
        return userRepository.findById(userId)
                .map(user -> user.getFollowers().size())
                .orElse(0);
    }

    public String uploadProfileImage(String id, MultipartFile file) throws IOException {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();

            // Example: save to local storage (or you can use AWS S3, Cloudinary, etc.)
            String uploadDir = "uploads/";
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(uploadDir + fileName);

            Files.createDirectories(filePath.getParent());
            Files.write(filePath, file.getBytes());

            String imageUrl = "http://localhost:8080/" + uploadDir + fileName;  // Adjust as needed
            user.setProfileImageUrl(imageUrl);

            userRepository.save(user);

            return imageUrl;
        } else {
            throw new FileNotFoundException("User not found");
        }
    }

}
