import { useState, useEffect, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProfilePage.css";

interface IUser {
  _id: string;
  username: string;
  email: string;
  role?: string;
}

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser | null>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const userString = localStorage.getItem("currentUser");
    if (userString) {
      const currentUser: IUser = JSON.parse(userString);
      setUser(currentUser);
      setUsername(currentUser.username);
      setEmail(currentUser.email);
      setRole(currentUser.role || "");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Authentication error. Please log in again.");
      setIsError(true);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        "/api/users/profile",
        { username, email, role },
        config
      );

      localStorage.setItem("currentUser", JSON.stringify(data));
      setMessage("Profile updated successfully!");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while updating the profile.";
      setMessage(errorMessage);
      setIsError(true);
    }
  };

  const getInitials = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : "?";
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <header className="top-navigation">
        <div className="nav-container">
          <p className="welcome-text">Your Profile</p>
          <div className="nav-buttons">
            <Link to="/home">
              <button className="back-to-home-btn">Back to Home</button>
            </Link>
          </div>
        </div>
      </header>

      <main className="profile-page-container">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              <span>{getInitials(username)}</span>
            </div>
            <h2>Edit Your Information</h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="role">Your Role</label>
              <input
                id="role"
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g., Software Developer"
                required
              />
            </div>
            <button type="submit" className="update-btn">
              Save Changes
            </button>
          </form>

          {message && (
            <p className={`message ${isError ? "error" : "success"}`}>
              {message}
            </p>
          )}
        </div>
      </main>
    </>
  );
};

export default ProfilePage;
