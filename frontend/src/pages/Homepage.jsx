import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Homepage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkLoginStatus = async () => {
    const response = await fetch("http://localhost:5000/current_user", {
      credentials: "include",
    });
    const data = await response.json();

    setIsLoggedIn(data.loggedIn);
  };
  useEffect(() => {
    checkLoginStatus();
  }, []);
  const handleLogout = async (e) => {
    const response = await fetch("http://localhost:5000/logout", {
      method: "POST",
      credentials: "include",
    });
    setIsLoggedIn(false);
    if (response.ok) {
      console.log("User logged out successfully");
    } else {
      console.error("Logout failed");
    }
  };
  return (
    <div>
      <Link to="/register">Register</Link>
      {isLoggedIn ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <Link to="/login">login</Link>
      )}
      <Link to="/tasks">Tasks</Link>
      Homepage
    </div>
  );
}

export default Homepage;
