import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginGuard from "./Shared/config/guards/login_guard";
import Login from "./Features/Login/login";
import Register from "./Features/Register/register";
import AuthGuard from "./Shared/config/guards/auth_guard";
import Home from "./Features/Homepage/homepage";
import ProfilePage from "./Features/ProfilePage/profilepage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route
        path="/login"
        element={
          <LoginGuard>
            <Login />
          </LoginGuard>
        }
      />
      <Route
        path="/register"
        element={
          <LoginGuard>
            <Register />
          </LoginGuard>
        }
      />
      <Route
        path="/home"
        element={
          <AuthGuard>
            <Home />
          </AuthGuard>
        }
      />
      <Route
        path="/profile"
        element={
          <AuthGuard>
            <ProfilePage />
          </AuthGuard>
        }
      />
    </Routes>
  );
}

export default App;
