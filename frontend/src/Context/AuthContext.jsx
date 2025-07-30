import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// create context
const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //  const verifyToken = async () => {
  //       try {
  //         const res = await axios.get('http://localhost:5000/api/v1/verify-token', {
  //           withCredentials: true,
  //         });
  //         setUser(res.data.user); // ✅ Extract user from token
  //       } catch (err) {
  //         console.error('Token verification failed:', err.response?.data || err.message);
  //         setUser(null);
  //       } finally {
  //         setLoading(false); // ✅ End loading either way
  //       }
  //     };

  // Check if token (in cookie) is valid on initial load
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/v1/verify-token",
          { withCredentials: true }
        );
        setUser(res.data.user); // set user in context/state
      } catch (err) {
        setUser(null); // no valid token
      } finally {
        setLoading(false);
      }
    };
    verifyUser();
    // verifyToken()
  }, []);

  const login = (userData) => {
    setUser(userData);
  };
  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/v1/logout",
        {},
        {
          withCredentials: true,
        }
      );
      setUser(null);

      //navigate('/login');
    } catch (err) {
      console.error("Logout error:", err.response?.data || err.message);
    }
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
