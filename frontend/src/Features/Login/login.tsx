import { useState, type ChangeEvent, type FormEvent } from "react";
import "./login.css";
import type { AxiosError, AxiosResponse } from "axios";
import { login } from "../../Shared/config/api";
import { useNavigate } from "react-router-dom";
import UserIcon from "../../assets/User-Icon.svg";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ username: "", password: "" });

  const [loading, setloading] = useState(false);

  const handlechange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    setloading(true);
    login(formData)
      .then((res: AxiosResponse) => {
        console.log("Login response:", res.data);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("currentUser", JSON.stringify(res.data.user));
        navigate("/home");
      })
      .catch((error: AxiosError) => {
        console.log(error);
      })
      .finally(() => {
        setloading(false);
      });
  };
  return (
    <div className="login-container">
      {/* Icon */}
      <div className="profile-icon">
        <img src={UserIcon} alt="User Icon" />
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          className="input-box"
          onChange={handlechange}
          value={formData.username}
          placeholder="Enter Username"
        />
        <input
          type="password"
          name="password"
          className="input-box"
          onChange={handlechange}
          value={formData.password}
          placeholder="Enter Password"
        />
        <button type="submit" className="login-button">
          LOGIN
        </button>{" "}
        <span onClick={() => navigate("/home")}></span>
        <p className="swicher">
          Don't have an account? {""}
          <span
            onClick={() => navigate("/register")}
            style={{ color: "blue", cursor: "pointer" }}
          >
            Register here
          </span>
        </p>
      </form>
    </div>
  );
}
