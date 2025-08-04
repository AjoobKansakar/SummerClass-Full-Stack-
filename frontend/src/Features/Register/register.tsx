import { useState, type ChangeEvent, type FormEvent } from "react"
import './register.css'
import type { AxiosError, AxiosResponse } from "axios";
import { register } from "../../Shared/config/api";

export default function Register(){
    const [formData, setFormData] = useState ({email: "", username: "", password: ""});

    const [loading, setLoading] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData ({...formData, [name]: value});
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (loading) return;

        setLoading(true);
        register(formData)
            .then((res: AxiosResponse) => {
                console.log ("Registration successful:", res);
                alert("Registration is completed!");
            })
            .catch ((error: AxiosError) => {
                console.error("Registration error:", error);
                alert ("Registration Failed!");
            })
            .finally (() => {
                setLoading(false);
            });
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit} action="">
                <h1> Register </h1>
                <input type="email" required placeholder="email" name="email" onChange={handleChange} value={formData.email} />
                <input type="text" placeholder="username" name="username" onChange={handleChange} value={formData.username} />
                <input type="password" placeholder="password" name="password" onChange={handleChange} value={formData.password} />
                <button type="submit" disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>
        </div>
    );
}