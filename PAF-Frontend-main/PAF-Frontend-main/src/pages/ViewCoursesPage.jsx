import React, { useState, useEffect } from "react";
import { Search, ChevronRight, Star, Clock, Users, Filter, SlidersHorizontal } from "lucide-react";
import CourseList from "../components/CourseList";

import php from "../assets/php.jpeg";
import java from "../assets/java.jpeg";
import javascript from "../assets/javascript.jpeg";
import css from "../assets/css.jpeg";

const CourseImages = [php, java, javascript, css];

const ViewCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8080/api/courses");

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        setCourses(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Filter categories
  const filters = ["All", "Development", "Business", "Design", "Marketing", "Photography", "Music"];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header/Hero */}
      <section className="relative text-white" style={{ background: "linear-gradient(to right, #125875, #FF7350)" }}>
        {/* Abstract pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent opacity-30"></div>
          <div
            className="absolute -top-40 -left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
            style={{ backgroundColor: "#FF7350" }}
          ></div>
          <div
            className="absolute top-0 -right-20 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
            style={{ backgroundColor: "#125875" }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-20">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
              Explore Our <span style={{ color: "#FF7350" }}>Courses</span>
            </h1>
            <p className="text-xl opacity-90 mb-6 max-w-lg mx-auto">
              Discover a wide range of courses designed to help you master new skills and advance your career.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="relative -mt-8 mb-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-xl p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={20} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search for courses, topics, or skills..."
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                  style={{ borderColor: "#FF7350", focus: { ringColor: "#125875" } }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <button 
                className="flex items-center justify-center gap-2 py-3 px-5 rounded-lg md:w-auto text-white"
                style={{ backgroundColor: "#125875" }}
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal size={18} />
                <span>Filters</span>
              </button>
            </div>

            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {filters.map((filter) => (
                    <button
                      key={filter}
                      className={`px-4 py-2 rounded-full ${
                        activeFilter === filter 
                          ? "text-white" 
                          : "text-gray-600 bg-gray-100 hover:bg-gray-200"
                      }`}
                      style={
                        activeFilter === filter 
                          ? { backgroundColor: "#FF7350" } 
                          : {}
                      }
                      onClick={() => setActiveFilter(filter)}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 mb-20">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar - Additional filters */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4">Categories</h3>
              <ul className="space-y-2">
                {filters.map((filter) => (
                  <li key={filter}>
                    <button 
                      className="flex items-center w-full text-left py-2 px-3 rounded-lg hover:bg-gray-100"
                      style={activeFilter === filter ? { color: "#FF7350" } : { color: "#125875" }}
                      onClick={() => setActiveFilter(filter)}
                    >
                      {activeFilter === filter && (
                        <span className="mr-2">•</span>
                      )}
                      {filter}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4">Level</h3>
              <div className="space-y-2">
                {["Beginner", "Intermediate", "Advanced", "All Levels"].map((level) => (
                  <div key={level} className="flex items-center">
                    <input 
                      type="checkbox" 
                      id={level} 
                      className="mr-3 rounded text-[#FF7350]" 
                    />
                    <label htmlFor={level} className="text-gray-700">{level}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Course List */}
          <div className="flex-grow">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="relative w-24 h-24">
                  <div
                    className="absolute top-0 left-0 w-full h-full rounded-full animate-ping"
                    style={{ border: "4px solid #FF7350", borderTopColor: "transparent" }}
                  ></div>
                  <div
                    className="absolute top-0 left-0 w-full h-full rounded-full animate-spin"
                    style={{ border: "4px solid #125875", borderTopColor: "transparent" }}
                  ></div>
                </div>
              </div>
            ) : error ? (
              <div className="bg-red-50 border-l-4 p-6 rounded-lg" style={{ borderColor: "#FF7350" }}>
                <div className="flex items-center">
                  <div className="flex-shrink-0" style={{ color: "#FF7350" }}>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium" style={{ color: "#FF7350" }}>
                      Unable to load courses
                    </h3>
                    <p style={{ color: "#FF7350" }}>
                      We're having trouble connecting to our servers. Please try again later.
                    </p>
                  </div>
                </div>
              </div>
            ) : courses.length === 0 ? (
              <div
                className="bg-yellow-50 border-l-4 p-6 rounded-lg"
                style={{ borderColor: "#FF7350", backgroundColor: "#FFF5F0" }}
              >
                <div className="flex">
                  <div className="flex-shrink-0" style={{ color: "#FF7350" }}>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium" style={{ color: "#FF7350" }}>
                      No courses available
                    </h3>
                    <p style={{ color: "#FF7350" }}>
                      We're working on adding new courses. Please check back soon!
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {activeFilter === "All" ? "All Courses" : `${activeFilter} Courses`}
                  </h2>
                  <div className="text-gray-600">
                    Showing {courses.length} courses
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((course, idx) => (
                    <a
                      key={course.id}
                      href={`/courses/${course.id}`}
                      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
                    >
                      <div className="relative">
                        <img
                          src={CourseImages[idx % CourseImages.length]}
                          alt={course.title || "Course"}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div
                          className="absolute top-3 right-3 text-white text-sm font-bold px-3 py-1 rounded-full"
                          style={{ backgroundColor: "#FF7350" }}
                        >
                          {course.level || "All Levels"}
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <Clock size={16} className="mr-1" />
                          <span>{course.duration || "8 weeks"}</span>
                          <span className="mx-2">•</span>
                          <Users size={16} className="mr-1" />
                          <span>
                            {course.enrollmentCount || Math.floor(Math.random() * 1000) + 100} students
                          </span>
                        </div>
                        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-[#FF7350] transition-colors">
                          {course.title || "Untitled Course"}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {course.description ||
                            "Learn valuable skills with this comprehensive course designed for all skill levels."}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden mr-2">
                              <img
                                src={course.instructorAvatar || "/api/placeholder/100/100"}
                                alt={course.instructor || "Instructor"}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span className="text-gray-700 text-sm font-medium">
                              {course.instructor || "Unknown Instructor"}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <div className="flex items-center mr-1">
                              <Star size={14} className="fill-yellow-400 text-yellow-400" />
                            </div>
                            <span className="text-gray-700 text-sm font-medium">
                              {course.rating || (Math.random() * 2 + 3).toFixed(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="mb-20">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="rounded-2xl overflow-hidden shadow-xl"
            style={{ background: "linear-gradient(to right, #125875, #FF7350)" }}
          >
            <div className="relative px-8 py-12">
              {/* Abstract shapes in background */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full transform -translate-x-20 -translate-y-20"></div>
              <div className="absolute bottom-0 left-20 w-40 h-40 bg-white opacity-10 rounded-full transform translate-y-10"></div>

              <div className="relative max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Stay Updated with New Courses
                </h2>
                <p className="text-white text-opacity-90 mb-6">
                  Subscribe to our newsletter and be the first to know about new course releases and exclusive offers.
                </p>
                <div className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-grow px-4 py-3 rounded-lg"
                  />
                  <button
                    className="bg-white text-[#FF7350] font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition duration-300"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ViewCoursesPage;