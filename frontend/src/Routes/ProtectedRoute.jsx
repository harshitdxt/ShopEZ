import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { Navigate } from "react-router-dom";
import axios from "axios";
function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();
  const [isAuthenticate, setAuthenticate] = useState(null);

  if (loading) {
    return (
      <div className="text-center mt-20 text-lg font-medium">
        Checking authentication...
      </div>
    );
  }

  if (!user) {
    // if not logged in then redirect to login page
    return <Navigate to={"/login"}></Navigate>;
  }
  console.log(
    "This is detail of the user in Protected route from the cookie verifying toaken",
    user
  );

  // If `allowedRoles` is provided, check role
  if (allowedRoles && !allowedRoles.includes(user.userType)) {
    return (
      <div className="text-center mt-20 text-red-600 font-semibold">
        🚫 Access Denied: You do not have permission to view this page.
      </div>
    );
  }

  return children;
}

export default ProtectedRoute;
