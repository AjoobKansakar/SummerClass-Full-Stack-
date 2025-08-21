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
    confirmPassword: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    // password confirmation
    if (formData.password !== formData.confirmPassword) {
      setError("**Passwords do not match**");
      return;
    }

    setLoading(true);
    register({
      email: formData.email,
      username: formData.username,
      password: formData.password,
      role: formData.role,
    })
      .then((res: AxiosResponse) => {
        console.log("Registration successful:", res);
        alert("Registration is completed!");
        setError("");
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

      <form className="register-form" onSubmit={handleSubmit}>
        <h1>Register</h1>

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
          onChange={handleChange}
          value={formData.password}
        />

        <input
          type="password"
          className="input-box"
          placeholder="Confirm Password"
          name="confirmPassword"
          onChange={handleChange}
          value={formData.confirmPassword}
        />

        <input
          type="text"
          className="input-box"
          placeholder="Role (e.g. Designer, Developer, Gamer)"
          name="role"
          onChange={handleChange}
          value={formData.role}
        />

        {/* Show error */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "REGISTER"}
        </button>

        <p className="swicher">
          Already have an account?{" "}
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
