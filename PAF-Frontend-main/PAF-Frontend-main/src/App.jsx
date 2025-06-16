import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AddCoursePage from "./pages/AddCoursePage";
import ViewCoursesPage from "./pages/ViewCoursesPage";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CourseDetailsPage from "./pages/CourseDetailsPage";
import Login from "./pages/User/Login";
import Register from "./pages/User/Register";
import Profile from "./pages/User/Profile";
import AllUsers from "./pages/User/AllUsers";
import UpdateProfile from "./pages/User/UpdateProfile";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/add" element={<AddCoursePage />} />
          <Route path="/courses" element={<ViewCoursesPage />} />
          <Route path="/courses/:id" element={<CourseDetailsPage />} />
           <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Login />} /> {/* default to login */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/users" element={<AllUsers />} />
          <Route path="/edit-profile" element={<UpdateProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
