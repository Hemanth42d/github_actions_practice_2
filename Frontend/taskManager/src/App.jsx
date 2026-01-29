import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Login from "./components/HomePage/Login";
import SignUp from "./components/HomePage/SignUp";
import MyTasks from "./components/MyTasks";
import Settings from "./components/Settings";
import Profile from "./components/Profile";
import { AuthProvider, useAuth } from "./context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/" />;
};

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/tasks" /> : <HomePage />}
        >
          <Route index element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <MyTasks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
