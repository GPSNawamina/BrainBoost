import React, { useState, useEffect } from "react";
import { addCourse, updateCourse } from "../services/courseService";

const CourseForm = ({ fetchCourses, courseToEdit, clearEdit }) => {
  const [course, setCourse] = useState({ name: "", description: "" });

  useEffect(() => {
    if (courseToEdit) {
      setCourse({ name: courseToEdit.name, description: courseToEdit.description });
    }
  }, [courseToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (courseToEdit) {
      await updateCourse(courseToEdit.id, course);
    } else {
      await addCourse(course);
    }
    fetchCourses();
    clearEdit();
    setCourse({ name: "", description: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded-lg mb-4">
      <h2 className="text-xl font-semibold mb-2">{courseToEdit ? "Edit" : "Add"} Course</h2>
      <input
        type="text"
        name="name"
        placeholder="Course Name"
        value={course.name}
        onChange={handleChange}
        className="block w-full mb-2 p-2 border rounded"
        required
      />
      <textarea
        name="description"
        placeholder="Course Description"
        value={course.description}
        onChange={handleChange}
        className="block w-full mb-2 p-2 border rounded"
        required
      />
      <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
        {courseToEdit ? "Update" : "Add"}
      </button>
    </form>
  );
};

export default CourseForm;
