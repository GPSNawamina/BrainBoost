import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getCourse,
  enrollCourse,
  updateProgress,
  addNote,
  deleteNote,
  toggleNoteCompletion,
} from "../services/courseService";
import { 
  BookOpen, 
  Star, 
  Clock, 
  Users, 
  ChevronRight, 
  Check, 
  Plus, 
  ChevronLeft,
  Video,
  FileText,
  Code,
  Award
} from "lucide-react";

const CourseDetailsPage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [noteText, setNoteText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const fetchCourse = async () => {
    try {
      setLoading(true);
      const res = await getCourse(id);
      setCourse(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching course:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [id]);

  // Add this handler function inside the component
const handleDeleteNote = async (index) => {
  try {
    await deleteNote(id, index);
    fetchCourse();
  } catch (err) {
    console.error("Error deleting note:", err);
    alert("Failed to delete note. Please try again.");
  }
};

  const handleEnroll = async () => {
    try {
      await enrollCourse(id);
      fetchCourse();
    } catch (err) {
      console.error("Error enrolling in course:", err);
      alert("Failed to enroll in course. Please try again.");
    }
  };

  const handleProgressUpdate = async (newProgress) => {
    try {
      await updateProgress(id, newProgress);
      fetchCourse();
    } catch (err) {
      console.error("Error updating progress:", err);
      alert("Failed to update progress. Please try again.");
    }
  };

  const handleAddNote = async () => {
    try {
      if (noteText.trim()) {
        await addNote(id, { text: noteText, done: false });
        setNoteText("");
        fetchCourse();
      }
    } catch (err) {
      console.error("Error adding note:", err);
      alert("Failed to add note. Please try again.");
    }
  };

  const handleToggleNote = async (index) => {
    try {
      await toggleNoteCompletion(id, index);
      fetchCourse();
    } catch (err) {
      console.error("Error toggling note completion:", err);
      alert("Failed to update note. Please try again.");
    }
  };

  const handleProgressBarInteraction = (e) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const x = Math.min(Math.max(e.clientX - rect.left, 0), rect.width);
    const percentage = Math.round((x / rect.width) * 100);
    handleProgressUpdate(percentage);
  };

  const lessons = [
    {
      id: 1,
      title: "Introduction to the Course",
      duration: "15 min",
      type: "video",
      completed: false
    },
    {
      id: 2,
      title: "Setting Up Your Environment",
      duration: "30 min",
      type: "tutorial",
      completed: false
    },
    {
      id: 3,
      title: "Core Concepts Explained",
      duration: "45 min",
      type: "video",
      completed: false
    },
    {
      id: 4,
      title: "Hands-on Practice Exercise",
      duration: "60 min",
      type: "exercise",
      completed: false
    },
    {
      id: 5,
      title: "Advanced Techniques",
      duration: "50 min",
      type: "video",
      completed: false
    }
  ];

  const getLessonIcon = (type) => {
    switch(type) {
      case 'video': return <Video size={18} className="mr-2" />;
      case 'tutorial': return <FileText size={18} className="mr-2" />;
      case 'exercise': return <Code size={18} className="mr-2" />;
      default: return <BookOpen size={18} className="mr-2" />;
    }
  };

  if (loading) {
    return (
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
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-4 mt-10">
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
                Unable to load course details
              </h3>
              <p style={{ color: "#FF7350" }}>
                We're having trouble loading this course. Please try again later.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!course) return <p className="text-center mt-10">Course not found</p>;

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Hero Banner */}
      <section
        className="relative text-white py-16"
        style={{ background: "linear-gradient(to right, #125875, #FF7350)" }}
      >
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

        <div className="relative max-w-5xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="md:w-2/3 md:pr-8">
              <div className="flex items-center mb-4">
                <div
                  className="font-bold py-1 px-3 rounded-full text-sm mr-3"
                  style={{ backgroundColor: "#FF7350", color: "white" }}
                >
                  {course.category || "Development"}
                </div>
                <div className="flex items-center">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={16} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="ml-2 font-medium">{course.rating || "4.8"}</span>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
                {course.name}
              </h1>
              <p className="text-lg opacity-90 mb-6">
                {course.description}
              </p>
              <div className="flex flex-wrap items-center text-sm mb-8">
                <div className="flex items-center mr-6 mb-2">
                  <Clock size={16} className="mr-1" />
                  <span>{course.duration || "8 weeks"}</span>
                </div>
                <div className="flex items-center mr-6 mb-2">
                  <Users size={16} className="mr-1" />
                  <span>{course.students || "324"} students</span>
                </div>
                <div className="flex items-center mb-2">
                  <BookOpen size={16} className="mr-1" />
                  <span>{lessons.length} lessons</span>
                </div>
              </div>
              {!course.enrolled && (
                <button
                  onClick={handleEnroll}
                  className="font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
                  style={{ backgroundColor: "#FF7350", color: "white" }}
                >
                  Enroll Now
                </button>
              )}
              {course.enrolled && (
                <div className="flex items-center">
                  <div
                    className="font-bold py-2 px-4 rounded-lg text-white flex items-center"
                    style={{ backgroundColor: "#125875" }}
                  >
                    <Check size={18} className="mr-2" />
                    Enrolled
                  </div>
                </div>
              )}
            </div>

            <div className="md:w-1/3 mt-8 md:mt-0 flex justify-center">
              <div className="relative w-full max-w-xs">
                <img
                  src={course.imageUrl || "/api/placeholder/400/300"}
                  alt={course.name}
                  className="rounded-xl shadow-xl w-full"
                />
                {course.instructor && (
                  <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden mr-3">
                        <img
                          src={course.instructorAvatar || "/api/placeholder/100/100"}
                          alt={course.instructor}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">{course.instructor}</p>
                        <p className="text-sm text-gray-600">Instructor</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4">
        {!selectedLesson ? (
          // Lessons List View
          <div className="bg-white rounded-xl shadow-xl p-8 mb-8">
            <h3 className="text-xl font-bold mb-6" style={{ color: "#125875" }}>
              Course Lessons
            </h3>
            
            <div className="space-y-4">
              {lessons.map((lesson) => (
                <div 
                  key={lesson.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedLesson(lesson)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4" 
                        style={{ backgroundColor: "#125875", color: "white" }}>
                        {lesson.id}
                      </div>
                      <div>
                        <h4 className="font-bold">{lesson.title}</h4>
                        <div className="flex items-center text-sm text-gray-600">
                          {getLessonIcon(lesson.type)}
                          <span>{lesson.duration}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {lesson.completed && (
                        <div className="mr-3 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          Completed
                        </div>
                      )}
                      <ChevronRight size={20} className="text-gray-400" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Lesson Progress View
          <div className="bg-white rounded-xl shadow-xl p-8 mb-8">
            <div className="flex justify-between items-center mb-6">
              <button 
                onClick={() => setSelectedLesson(null)}
                className="flex items-center text-gray-600 hover:text-gray-800"
              >
                <ChevronLeft size={20} className="mr-1" />
                Back to Lessons
              </button>
              <h3 className="text-xl font-bold" style={{ color: "#125875" }}>
                {selectedLesson.title}
              </h3>
              <div className="w-6"></div>
            </div>

            <div className="mb-8">
              <div className="flex items-center text-sm text-gray-600 mb-4">
                {getLessonIcon(selectedLesson.type)}
                <span>{selectedLesson.duration}</span>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                

{selectedLesson.type === 'video' && (
  <div className="relative bg-black rounded-lg overflow-hidden mb-4">
   
    
    {/* Video Controls */}
    <div className="absolute bottom-0 left-0 right-0 bg-gray-900 bg-opacity-75 p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button className="text-white hover:text-red-500 transition">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            </svg>
          </button>
          <div className="text-white text-sm">12:45 / 50:30</div>
        </div>
        
        <div className="flex-1 mx-4">
          <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-red-500" style={{ width: '25%' }}></div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="text-white hover:text-gray-300 transition">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.728-2.728" />
            </svg>
          </button>
          <button className="text-white hover:text-gray-300 transition">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          </button>
          <button className="text-white hover:text-gray-300 transition">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
)}

<h4 className="font-semibold mb-2">Lesson Content: Advanced Techniques</h4>

<div className="prose max-w-none mb-6">
  <p className="mb-4">In this lesson, we'll dive deep into advanced techniques that will take your skills to the next level. These concepts are used by industry professionals to solve complex problems efficiently.</p>

  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
    <h5 className="font-bold text-blue-800 mb-2">Lesson Objectives</h5>
    <ul className="list-disc pl-5 space-y-1 text-blue-700">
      <li>Understand advanced optimization techniques</li>
      <li>Master performance tuning methodologies</li>
      <li>Learn architectural patterns for scalability</li>
      <li>Implement advanced debugging strategies</li>
    </ul>
  </div>

  <h5 className="font-bold mt-6 mb-3">Key Concepts</h5>
  <div className="grid md:grid-cols-2 gap-4 mb-6">
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-center mb-2">
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
          <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h6 className="font-semibold">Performance Optimization</h6>
      </div>
      <p className="text-sm text-gray-600">Learn how to identify and eliminate bottlenecks in your applications using advanced profiling tools.</p>
    </div>
    
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-center mb-2">
        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
          <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
        </div>
        <h6 className="font-semibold">Scalable Architecture</h6>
      </div>
      <p className="text-sm text-gray-600">Explore patterns like microservices, event sourcing, and CQRS for building systems that grow with your needs.</p>
    </div>
  </div>

  <h5 className="font-bold mt-6 mb-3">Practical Exercise</h5>
  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
    <div className="flex">
      <div className="flex-shrink-0">
        <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      </div>
      <div className="ml-3">
        <h6 className="text-sm font-medium text-yellow-800">Hands-on Challenge</h6>
        <div className="mt-2 text-sm text-yellow-700">
          <p>Implement a performance optimization on the provided codebase. Use the techniques discussed in this lesson to achieve at least 40% improvement in execution time.</p>
          <button className="mt-3 inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none">
            Download Exercise Files
          </button>
        </div>
      </div>
    </div>
  </div>

  <h5 className="font-bold mt-6 mb-3">Additional Resources</h5>
  <div className="space-y-2">
    <a href="#" className="flex items-center text-blue-600 hover:text-blue-800">
      <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
      Advanced Techniques Cheat Sheet (PDF)
    </a>
    <a href="#" className="flex items-center text-blue-600 hover:text-blue-800">
      <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
      Reference Implementation Repository
    </a>
  </div>
</div>

<p className="text-sm text-gray-600 mb-6">Complete the lesson and update your progress below when finished.</p>


              </div>

              <div className="mb-6">
                <h3 className="text-lg font-bold mb-4" style={{ color: "#125875" }}>
                  Your Progress
                </h3>
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-700">
                      {course.completed ? "Completed!" : `${course.progress}% Complete`}
                    </span>
                    <span className="text-sm font-medium" style={{ color: "#FF7350" }}>
                      {course.progress}/100
                    </span>
                  </div>
                  <div 
                    className="w-full bg-gray-200 rounded-full h-4 overflow-hidden cursor-pointer relative"
                    onClick={handleProgressBarInteraction}
                    onMouseMove={(e) => isDragging && handleProgressBarInteraction(e)}
                    onMouseDown={() => setIsDragging(true)}
                    onMouseUp={() => setIsDragging(false)}
                    onMouseLeave={() => setIsDragging(false)}
                  >
                    <div
                      className="h-4 rounded-full transition-all duration-300 relative"
                      style={{ 
                        width: `${course.progress}%`,
                        background: "linear-gradient(to right, #FF7350, #125875)" 
                      }}
                    >
                      <div 
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 w-4 h-4 rounded-full bg-white border-2 border-white shadow-md"
                        style={{ borderColor: "#125875" }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between text-xs text-gray-500">
                  <span>0%</span>
                  <span>25%</span>
                  <span>50%</span>
                  <span>75%</span>
                  <span>100%</span>
                </div>
              </div>

              {course.progress === 100 && (
                <div className="bg-yellow-50 border-l-4 p-4 rounded-lg mb-6 flex items-center"
                  style={{ borderColor: "#FF7350" }}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
                    style={{ backgroundColor: "#FF7350" }}>
                    <Award size={24} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1" style={{ color: "#125875" }}>
                      Lesson Completed!
                    </h4>
                    <p style={{ color: "#FF7350" }}>
                      Great job! You've completed this lesson.
                    </p>
                  </div>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold mb-6" style={{ color: "#125875" }}>
                  Learning Notes
                </h3>
                
                <div className="flex mb-6">
                  <input
                    type="text"
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    className="flex-grow py-3 px-4 border rounded-l-lg focus:outline-none focus:ring-2"
                    style={{ borderColor: "#125875", focusRingColor: "#FF7350" }}
                    placeholder="Add a note about your progress..."
                    onKeyPress={(e) => e.key === 'Enter' && noteText.trim() && handleAddNote()}
                  />
                  <button 
                    onClick={handleAddNote} 
                    className="px-6 flex items-center justify-center rounded-r-lg transition-colors"
                    style={{ backgroundColor: "#FF7350", color: "white" }}
                    disabled={!noteText.trim()}
                  >
                    <Plus size={20} className="mr-1" />
                    Add
                  </button>
                </div>
                
                {course.notes && course.notes.length > 0 ? (
                  <div className="space-y-3">
                    {course.notes.map((note, index) => (
                      <div
                        key={index}
                        className={`p-4 border rounded-lg flex justify-between items-center transition-all duration-200 ${
                          note.done ? "bg-gray-50" : "bg-white"
                        }`}
                        style={{ borderColor: note.done ? "#125875" : "#e2e8f0" }}
                      >
                        <p className={note.done ? "text-gray-500 line-through" : "text-gray-800"}>
                          {note.text}
                        </p>
                        <button 
                          onClick={() => handleToggleNote(index)} 
                          className={`text-sm px-3 py-2 rounded-lg flex items-center transition-colors ${
                            note.done 
                              ? "text-white" 
                              : "text-gray-600 bg-gray-100 hover:bg-gray-200"
                          }`}
                          style={note.done ? { backgroundColor: "#125875" } : {}}
                        >
                          {note.done ? (
                            <>
                              <Check size={16} className="mr-1" />
                              Completed
                            </>
                          ) : (
                            "Mark Complete"
                          )}
                        </button>
                        <button
          onClick={() => handleDeleteNote(index)}
          className="text-sm px-3 py-2 rounded-lg flex items-center transition-colors text-white bg-red-500 hover:bg-red-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          Delete
        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 border border-dashed rounded-lg bg-gray-50">
                    <p className="text-gray-500">No notes yet. Add your first learning note!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        <div className="flex justify-center">
          <a 
            href="/dashboard" 
            className="font-medium flex items-center group"
            style={{ color: "#FF7350" }}
          >
            Return to Dashboard
            <ChevronRight
              size={18}
              className="ml-1 group-hover:translate-x-1 transition-transform"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;