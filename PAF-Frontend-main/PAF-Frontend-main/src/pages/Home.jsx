import React, { useState, useEffect } from "react";
import { Search, ArrowRight, BookOpen, Star, Clock, Users, ChevronRight } from "lucide-react";
import CourseForm from "../components/CourseForm";
import CourseList from "../components/CourseList";


import php from "../assets/php.jpeg";
import java from "../assets/java.jpeg";
import javascript from "../assets/javascript.jpeg";
import css from "../assets/css.jpeg";

const CourseImages = [php, java, javascript, css];

const Home = () => {
  const [editCourse, setEditCourse] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const triggerRefresh = () => setRefresh(!refresh);

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
  }, [refresh]);

  // Categories with new color palette
  const categories = [
    { name: "Development", count: 240, color: "#FF7350" }, // Orange
    { name: "Business", count: 183, color: "#125875" },    // Teal
    { name: "Design", count: 157, color: "#FF7350" },      // Orange
    { name: "Marketing", count: 129, color: "#125875" },   // Teal
    { name: "Photography", count: 92, color: "#FF7350" },  // Orange
    { name: "Music", count: 68, color: "#125875" }         // Teal
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header/Hero */} 
      <section className="relative text-white" style={{background: "linear-gradient(to right, #125875, #FF7350)"}}>
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
          <div
            className="absolute -bottom-40 left-20 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
            style={{ backgroundColor: "#FF7350" }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28 flex flex-col md:flex-row md:items-center">
          <div className="md:w-1/2 md:pr-12 mb-12 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Expand Your Skills, <span style={{color: "#FF7350"}}>Define Your Future</span>
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8 max-w-lg">
              Join thousands of students learning from industry experts and building their career path.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/courses"
                className="font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1 text-center"
                style={{ backgroundColor: "#FF7350", color: "white" }}
              >
                Explore Courses
              </a>
              <a
                href="/signup"
                className="font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-[#125875] transition duration-300 text-center border-2"
                style={{ borderColor: "white", color: "white", backgroundColor: "transparent" }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = "white";
                  e.currentTarget.style.color = "#125875";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "white";
                }}
              >
                Join Now
              </a>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md">
              <img
                src="/api/placeholder/600/500"
                alt="Students learning"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={18} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="font-bold">4.9/5</span>
                </div>
                <p className="text-gray-600 text-sm">Trusted by 10,000+ students</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Quick Stats */}
      <section className="relative -mt-8 mb-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={20} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search for courses, topics, or skills..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  style={{ borderColor: "#FF7350", focus: { ringColor: "#125875" } }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-3 gap-4 md:gap-8">
                <div className="text-center">
                  <p className="text-3xl font-bold" style={{ color: "#FF7350" }}>
                    1200+
                  </p>
                  <p className="text-gray-600 text-sm">Courses</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold" style={{ color: "#125875" }}>
                    650+
                  </p>
                  <p className="text-gray-600 text-sm">Instructors</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold" style={{ color: "#FF7350" }}>
                    50k+
                  </p>
                  <p className="text-gray-600 text-sm">Students</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="mb-20 max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap justify-between items-end mb-10">
          <div>
            <h5 style={{ color: "#FF7350" }} className="font-semibold mb-1">
              TOP CATEGORIES
            </h5>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Browse Popular Categories
            </h2>
          </div>
          <a
            href="/categories"
            style={{ color: "#FF7350" }}
            className="font-semibold flex items-center group"
          >
            View All Categories{" "}
            <ChevronRight
              size={18}
              className="ml-1 group-hover:translate-x-1 transition-transform"
              style={{ color: "#FF7350" }}
            />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <a
              key={index}
              href={`/courses?category=${category.name}`}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group"
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: category.color }}
              >
                <BookOpen size={24} className="text-white" />
              </div>
              <h3 className="font-bold text-gray-800 mb-1">{category.name}</h3>
              <p className="text-gray-500 text-sm">{category.count} courses</p>
            </a>
          ))}
        </div>
      </section>

      {/* Featured Courses */}
      <section className="mb-20 max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap justify-between items-end mb-10">
          <div>
            <h5 style={{ color: "#FF7350" }} className="font-semibold mb-1">
              TOP COURSES
            </h5>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Featured Courses
            </h2>
          </div>
          <a
            href="/courses"
            style={{ color: "#FF7350" }}
            className="font-semibold flex items-center group"
          >
            View All Courses{" "}
            <ChevronRight
              size={18}
              className="ml-1 group-hover:translate-x-1 transition-transform"
              style={{ color: "#FF7350" }}
            />
          </a>
        </div>

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
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {courses.slice(0, 8).map((course,idx) => (
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
                    {course.name || "Untitled Course"}
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
        )}
      </section>

      {/* Trending Topics */}
      <section className="mb-20 bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h5 style={{ color: "#FF7350" }} className="font-semibold mb-1">
              TRENDING NOW
            </h5>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Popular Topics to Explore
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {[
              "Machine Learning",
              "JavaScript",
              "Python",
              "Data Science",
              "UX/UI Design",
              "React",
              "Digital Marketing",
              "Artificial Intelligence",
              "Node.js",
              "Leadership",
              "Photography",
              "3D Modeling",
              "Flutter",
              "Cloud Computing",
            ].map((topic, index) => (
              <a
                key={index}
                href={`/courses?topic=${topic}`}
                className="bg-white font-medium px-5 py-3 rounded-lg shadow hover:shadow-md transition-all duration-300"
                style={{ color: "#125875" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#FF7350";
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "white";
                  e.currentTarget.style.color = "#125875";
                }}
              >
                {topic}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mb-20 max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h5 style={{ color: "#FF7350" }} className="font-semibold mb-1">
            TESTIMONIALS
          </h5>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            What Our Students Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            className="bg-white rounded-xl p-8 shadow-lg border-t-4"
            style={{ borderTopColor: "#FF7350" }}
          >
            <div className="flex mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={18} className="fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-gray-700 mb-6">
              "The courses are incredibly well-structured and the instructors are top-notch. I learned more in two months than I did in two years of self-study!"
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden mr-4">
                <img
                  src="/api/placeholder/100/100"
                  alt="Student"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Emma Thompson</h4>
                <p className="text-gray-600 text-sm">Web Developer</p>
              </div>
            </div>
          </div>

          <div
            className="bg-white rounded-xl p-8 shadow-lg border-t-4"
            style={{ borderTopColor: "#125875" }}
          >
            <div className="flex mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={18} className="fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-gray-700 mb-6">
              "The community aspect of this platform is what sets it apart. I not only learned valuable skills but also made connections that led to job opportunities."
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden mr-4">
                <img
                  src="/api/placeholder/100/100"
                  alt="Student"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Marcus Chen</h4>
                <p className="text-gray-600 text-sm">Data Scientist</p>
              </div>
            </div>
          </div>

          <div
            className="bg-white rounded-xl p-8 shadow-lg border-t-4"
            style={{ borderTopColor: "#FF7350" }}
          >
            <div className="flex mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={18} className="fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-gray-700 mb-6">
              "As someone transitioning careers, this platform was exactly what I needed. The courses were practical and relevant, and I landed a job within 3 months of starting."
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden mr-4">
                <img
                  src="/api/placeholder/100/100"
                  alt="Student"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Sophia Rodriguez</h4>
                <p className="text-gray-600 text-sm">UX Designer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mb-20">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="rounded-2xl overflow-hidden shadow-xl"
            style={{ background: "linear-gradient(to right, #FF7350, #125875)" }}
          >
            <div className="relative">
              {/* Abstract shapes in background */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full transform -translate-x-20 -translate-y-20"></div>
              <div className="absolute bottom-0 left-20 w-40 h-40 bg-white opacity-10 rounded-full transform translate-y-10"></div>

              <div className="relative px-8 py-12 md:py-16 md:px-16">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-8 md:mb-0 md:mr-8 md:max-w-xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                      Ready to Start Your Learning Journey?
                    </h2>
                    <p className="text-white text-opacity-90 text-lg mb-6">
                      Join our community of learners and transform your skills with expert-led courses.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <a
                        href="/courses"
                        className="font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1 text-center"
                        style={{ backgroundColor: "white", color: "#FF7350" }}
                      >
                        Explore Courses
                      </a>
                      <a
                        href="/signup"
                        className="font-bold py-3 px-8 rounded-lg border-2 border-white hover:bg-white hover:text-[#125875] transition duration-300 text-center"
                        style={{ color: "white", backgroundColor: "transparent" }}
                      >
                        Sign Up Free
                      </a>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="bg-white p-2 rounded-xl shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                      <img
                        src="/api/placeholder/300/200"
                        alt="Learning"
                        className="rounded-lg w-full max-w-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
