import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaCheckCircle } from "react-icons/fa"; // Import checkmark icon

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/courses")
      .then((res) => {
        setCourses(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch courses", err);
      });
  }, []);

  const handleViewCourse = (id) => {
    navigate(`/courses/${id}`);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">All Courses</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-2xl shadow-md p-6 border hover:shadow-lg transition relative"
          >
            {/* Completed badge - only shows when progress is 100% */}
            {course.progress === 100 && (
              <div className="absolute top-2 right-2 bg-green-100 text-green-800 px-2 py-1 rounded-full flex items-center text-xs font-semibold">
                <FaCheckCircle className="mr-1" /> Completed
              </div>
            )}

            <h3 className="text-xl font-semibold text-gray-800 mb-2">{course.name}</h3>
            <p className="text-gray-600 mb-4">{course.description}</p>
            <p className="text-sm text-gray-500 mb-2">
              <strong>Enrolled:</strong> {course.enrolled ? "Yes" : "No"}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              <strong>Progress:</strong> {course.progress}%
            </p>
            <button
              onClick={() => handleViewCourse(course.id)}
              className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;