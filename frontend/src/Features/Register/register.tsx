import { useState, type ChangeEvent, type FormEvent } from "react";
import "./register.css";
import type { AxiosError, AxiosResponse } from "axios";
import { register } from "../../Shared/config/api";
import UserIcon from "../../assets/User-Icon.svg";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    register(formData)
      .then((res: AxiosResponse) => {
        console.log("Registration successful:", res);
        alert("Registration is completed!");
      })
      .catch((error: AxiosError) => {
        console.error("Registration error:", error);
        alert("Registration Failed!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="register-container">
      {/* Icon */}
      <div className="profile-icon">
        <img src={UserIcon} alt="User Icon" />
      </div>
      <form className="register-form" onSubmit={handleSubmit} action="">
        <h1> Register </h1>
        <input
          type="email"
          className="input-box"
          required
          placeholder="Your Email"
          name="email"
          onChange={handleChange}
          value={formData.email}
        />
        <input
          type="text"
          className="input-box"
          placeholder="Full Name"
          name="username"
          onChange={handleChange}
          value={formData.username}
        />
        <input
          type="password"
          className="input-box"
          placeholder="Password"
          name="password"
        />
        <input
          type="password"
          className="input-box"
          placeholder="Confirm Password"
          name="password"
          onChange={handleChange}
          value={formData.password}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "REGISTER"}
        </button>

        <p className="swicher">
          Already have an account? {""}
          <span
            onClick={() => navigate("/login")}
            style={{ color: "blue", cursor: "pointer" }}
          >
            Login now
          </span>
        </p>
      </form>
    </div>
  );
}
