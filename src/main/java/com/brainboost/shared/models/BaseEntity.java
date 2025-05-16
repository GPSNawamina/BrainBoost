package com.brainboost.shared.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import java.time.LocalDateTime;

@Data
public abstract class BaseEntity {
    @Id
    private String id;
    private LocalDateTime createdAt = LocalDateTime.now();
}
