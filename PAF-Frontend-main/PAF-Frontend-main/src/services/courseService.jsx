import axios from "axios";

const API_BASE = "http://localhost:8080/api/courses";

export const getAllCourses = () => axios.get(API_BASE);
export const getCourse = (id) => axios.get(`${API_BASE}/${id}`);
export const addCourse = (course) => axios.post(API_BASE, course);
export const updateCourse = (id, course) => axios.put(`${API_BASE}/${id}`, course);
export const deleteCourse = (id) => axios.delete(`${API_BASE}/${id}`);
export const enrollCourse = (id) => axios.put(`${API_BASE}/enroll/${id}`);
export const updateProgress = (id, progress) =>
  axios.put(`${API_BASE}/progress/${id}?progress=${progress}`);

// ✅ Add a note to a course
export const addNote = (id, note) =>
  axios.post(`${API_BASE}/${id}/notes`, note);

// ✅ Toggle completion status of a note (by index)
export const toggleNoteCompletion = (id, index) =>
  axios.put(`${API_BASE}/${id}/notes/${index}/toggle`);

// Add this to your server.js (or courseService.js) with the other exports
export const deleteNote = (id, index) => 
  axios.delete(`${API_BASE}/${id}/notes/${index}`);
