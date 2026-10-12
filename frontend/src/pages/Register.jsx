import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "jobseeker"
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setLoading(true);

        try {

            const response = await api.post(
                "/auth/register",
                form
            );

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            navigate("/");

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Registration failed"
            );

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="auth-container">

            <div className="auth-card">

                <h2>Create Account</h2>

                <p>
                    Join our Job Portal
                </p>

                {error && (
                    <div className="error">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <label>
                        Full Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />

                    <label>
                        Email
                    </label>

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />

                    <label>
                        Password
                    </label>

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />

                    <label>
                        Register As
                    </label>

                    <select
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                    >

                        <option value="jobseeker">
                            Job Seeker
                        </option>

                        <option value="recruiter">
                            Recruiter
                        </option>

                    </select>

                    <button
                        type="submit"
                        disabled={loading}
                    >

                        {loading
                            ? "Creating Account..."
                            : "Register"}

                    </button>

                </form>

                <p className="auth-link">

                    Already have an account?

                    <Link to="/login">
                        Login
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Register;