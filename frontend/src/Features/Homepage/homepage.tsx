import { useEffect, useState, type ChangeEvent } from "react";
import "./homepage.css";
import { Link, useNavigate } from "react-router-dom";
import type { AxiosResponse } from "axios";
import { searchUserApi } from "../../Shared/config/api";
import SearchIcon from "../../assets/Search_icon.svg";

interface IUser {
  _id: string;
  username: string;
  email: string;
  role?: string;
}

interface IUserResponse {
  message: string;
  users: IUser[];
}

function Home() {
  const navigate = useNavigate();
  const userString = localStorage.getItem("currentUser");

  useEffect(() => {
    if (!userString) {
      navigate("/login");
    }
  }, [navigate, userString]);

  if (!userString) {
    return null;
  }

  const user: IUser = JSON.parse(userString);

  const [userList, setUserList] = useState<IUser[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const searchTags: string[] = [
    "All",
    "Designer",
    "Developer",
    "Photographer",
    "Gamer",
    "Others",
  ];

  useEffect(() => {
    setLoading(true);
    const apiCall =
      selectedTag === "All"
        ? searchUserApi(search)
        : searchUserApi(search, selectedTag);

    apiCall
      .then((res: AxiosResponse<IUserResponse>) => {
        setUserList(res.data.users.filter((u) => u._id !== user._id));
      })
      .catch((error) => {
        console.error("Failed to fetch users:", error);
        setUserList([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [search, selectedTag, user._id]);

  const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <>
      <header className="top-navigation">
        <div className="nav-container">
          <p className="welcome-text">Welcome back, {user.username}</p>
          <div className="nav-buttons">
            <Link to="/profile">
              <button className="profile-btn">Profile</button>
            </Link>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="homepage-container">
        <div className="hero-section">
          <h1>Find Your Next Connection</h1>
          <p className="subtitle">
            Explore a network of talented professionals
          </p>
          <div className="search-bar">
            <img src={SearchIcon} alt="Search" className="search-icon" />
            <input
              id="search-text"
              type="text"
              onChange={onValueChange}
              value={search}
              placeholder="Search by name or keyword..."
            />
          </div>
        </div>

        <div className="search-tags">
          {searchTags.map((tag: string) => (
            <button
              key={tag}
              className={`tag-pill ${selectedTag === tag ? "selected" : ""}`}
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="results-grid">
          {loading ? (
            <p>Loading professionals...</p>
          ) : userList.length > 0 ? (
            userList.map((professional: IUser) => (
              <div className="user-card" key={professional._id}>
                <div className="card-header">
                  <div className="avatar-circle">
                    <span>{getInitials(professional.username)}</span>
                  </div>
                  <div className="user-info">
                    <h3 className="user-name">{professional.username}</h3>
                    <p className="user-role">
                      {professional.role || "Professional"}
                    </p>
                  </div>
                </div>
                <p className="user-email">
                  {professional.email || "No email provided"}
                </p>
              </div>
            ))
          ) : (
            <p>No professionals found matching your criteria.</p>
          )}
        </div>
      </main>
    </>
  );
}

export default Home;
