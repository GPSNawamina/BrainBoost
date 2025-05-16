# BrainBoost 🧠

An educational platform for tracking learning progress and managing courses.

## Project Structure

The project follows a modular monolith architecture with the following main components:

### Core Modules

1. **Course Management**
   - Course creation and management
   - Module organization
   - Enrollment tracking
   - Collections: `courses`, `modules`, `enrollments`

2. **Learning Progress Tracker**
   - Progress monitoring
   - Achievement system
   - Collections: `learning_progress`, `achievements`

### Technology Stack

- Java 17
- Spring Boot 3.2.3
- MongoDB
- Spring Security with OAuth 2.0
- Maven

## Setup Instructions

1. **Prerequisites**
   - Java 17 or higher
   - MongoDB 4.4 or higher
   - Maven 3.6 or higher

2. **Environment Variables**
   Create a `.env` file in the project root with:
   ```
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

3. **Database Setup**
   - Ensure MongoDB is running on localhost:27017
   - The application will automatically create the `brainboost` database

4. **Build and Run**
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

## API Documentation

The API will be available at `http://localhost:8080/api`

### Course Management Endpoints
- `GET /api/courses` - List all courses
- `POST /api/courses` - Create a new course
- `GET /api/courses/{id}` - Get course details
- `PUT /api/courses/{id}` - Update course
- `DELETE /api/courses/{id}` - Delete course

### Learning Progress Endpoints
- `GET /api/progress/{userId}` - Get user's learning progress
- `POST /api/progress` - Log progress update
- `GET /api/achievements/{userId}` - Get user's achievements

## Future Enhancements

1. Notification System
   - Progress reminders
   - Achievement notifications
   - Course updates

2. Gamification Engine
   - Leaderboards
   - Points system
   - Social features

3. Analytics Dashboard
   - Course popularity metrics
   - Learning trends
   - User engagement statistics

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 