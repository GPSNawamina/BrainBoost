import React from "react";
import { ArrowLeft, BookOpen } from "lucide-react";
import CourseForm from "../components/CourseForm";

const AddCoursePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner */}
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
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-extrabold leading-tight mb-4">
              Create a New <span style={{color: "#FF7350"}}>Course</span>
            </h1>
            <p className="text-xl opacity-90 mb-6">
              Share your knowledge and expertise with our learning community.
            </p>
            <a 
              href="/" 
              className="inline-flex items-center text-white hover:text-gray-100 transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Home
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 -mt-8 mb-16 relative z-10">
        <div className="bg-white rounded-xl shadow-xl p-8">
          <div className="flex items-center mb-8">
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
              style={{ backgroundColor: "#FF7350" }}
            >
              <BookOpen size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold" style={{ color: "#125875" }}>Course Information</h2>
              <p className="text-gray-600">Complete the form below to create your course</p>
            </div>
          </div>
          
          <CourseForm 
            fetchCourses={() => {}} 
            clearEdit={() => {}} 
          />
        </div>
      </div>
    </div>
  );
};

export default AddCoursePage;