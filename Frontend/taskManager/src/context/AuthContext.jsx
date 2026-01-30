import { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../services/api";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials);
      if (response.success) {
        const userData = { email: credentials.email };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));

        // Store token if provided
        if (response.token) {
          localStorage.setItem("token", response.token);
        }

        return { success: true };
      }
      return response;
    } catch (error) {
      return {
        error: true,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData);
      if (response.success) {
        const userInfo = { email: userData.email, name: userData.name };
        setUser(userInfo);
        localStorage.setItem("user", JSON.stringify(userInfo));

        // Store token if provided
        if (response.token) {
          localStorage.setItem("token", response.token);
        }

        return { success: true };
      }
      return response;
    } catch (error) {
      return {
        error: true,
        message: error.response?.data?.message || "Registration failed",
      };
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
