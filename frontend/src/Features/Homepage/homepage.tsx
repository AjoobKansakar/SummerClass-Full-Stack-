import { useEffect, useState, type ChangeEvent } from "react";
import "./homepage.css";
import { useNavigate } from "react-router-dom";
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
  if (!userString) {
    navigate("/login");
    return null;
  }
  const user: IUser = JSON.parse(userString);
  const [userList, setUserList] = useState<IUser[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const searchTags: string[] = ["All", "Designer", "Developer", "Photographer"];

  useEffect(() => {
    setLoading(true);
    // ALl
    if (selectedTag === "All") {
      searchUserApi(search)
        .then((res: AxiosResponse<IUserResponse>) => {
          setUserList(res.data.users);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      searchUserApi(search, selectedTag)
        .then((res: AxiosResponse<IUserResponse>) => {
          setUserList(res.data.users);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [search, selectedTag]);

  const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
  };

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    // Html code:
    <div className="homepage-wrapper">
      <div className="top-navigation">
        <p>Welcome back, {user.username.toUpperCase()}</p>
        <button onClick={handleLogout} className="log-outBtn">
          Logout
        </button>
      </div>

      <div className="hero-wrapper">
        <h1>Search Your Professional</h1>

        <div className="search-bar">
          <img src={SearchIcon} alt="Search" className="search-icon" />
          <input
            id="search-text"
            type="text"
            onChange={onValueChange}
            value={search}
            placeholder="Search"
          />
        </div>
      </div>

      <div className="search-tags">
        {searchTags.map((tag: string) => (
          <div
            key={tag}
            className={`pills${selectedTag === tag ? " selected" : ""}`}
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </div>
        ))}
      </div>

      {!loading && (
        <div className="results">
          {userList.length > 0 ? (
            userList.map((user: IUser) => (
              <div className="card" key={user._id}>
                <h3>{user.username}</h3>
                <p>{user.role || "No role set"}</p>
                <p>{user.email || "No email"}</p>
              </div>
            ))
          ) : (
            <p>No users found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
