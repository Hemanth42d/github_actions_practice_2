import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Login from "./components/HomePage/Login";
import SignUp from "./components/HomePage/SignUp";
import Dashboard from "./components/Dashboard";
import MyTasks from "./components/MyTasks";
import Settings from "./components/Settings";
import Profile from "./components/Profile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="/login" element={<Login />} />
          <Route index element={<SignUp />} />
        </Route>
        <Route path="/tasks" element={<MyTasks />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
