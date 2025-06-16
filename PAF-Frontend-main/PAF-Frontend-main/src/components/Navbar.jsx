import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();

  // helper to generate link styles
  const makeStyle = (path, colorHex) => ({
    backgroundColor:
      pathname === path
        ? `${colorHex}CC`   // 80% opacity
        : `${colorHex}26`,  // 15% opacity
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    color: pathname === path ? "#FFFFFF" : colorHex,
  });

  return (
    <nav
      className="sticky top-0 z-50 flex justify-between items-center p-4 shadow"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
      }}
    >
      <Link to="/" className="text-2xl font-bold text-gray-800">
        BrainBoost
      </Link>
      <div className="space-x-4">
        <Link
          to="/add"
          className="px-4 py-2 rounded font-medium transition-colors duration-300"
          style={makeStyle("/add", "#FF7350")}
        >
          Add Course
        </Link>

        <Link
          to="/courses"
          className="px-4 py-2 rounded font-medium transition-colors duration-300"
          style={makeStyle("/courses", "#125875")}
        >
          All Courses
        </Link>

        <Link
          to="/profile"
          className="px-4 py-2 rounded font-medium transition-colors duration-300"
          style={makeStyle("/profile", "#FF7350")}
        >
          Profile
        </Link>

        <Link
          to="/users"
          className="px-4 py-2 rounded font-medium transition-colors duration-300"
          style={makeStyle("/users", "#125875")}
        >
          All Users
        </Link>

        <Link
          to="/edit-profile"
          className="px-4 py-2 rounded font-medium transition-colors duration-300"
          style={makeStyle("/edit-profile", "#FF7350")}
        >
          Edit Profile
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
