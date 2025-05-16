-- Create achievements table
CREATE TABLE IF NOT EXISTS achievements (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(1000),
    course_id BIGINT,
    progress INT NOT NULL DEFAULT 0,
    target INT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create learning_progress table
CREATE TABLE IF NOT EXISTS learning_progress (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    course_id BIGINT NOT NULL,
    progress INT NOT NULL DEFAULT 0,
    total_modules INT NOT NULL,
    completion_percentage DOUBLE NOT NULL DEFAULT 0.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create learning_progress_achievements table
CREATE TABLE IF NOT EXISTS learning_progress_achievements (
    progress_id BIGINT NOT NULL,
    achievement_id BIGINT NOT NULL,
    PRIMARY KEY (progress_id, achievement_id),
    FOREIGN KEY (progress_id) REFERENCES learning_progress(id),
    FOREIGN KEY (achievement_id) REFERENCES achievements(id)
); 