import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

function Login() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
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
                "/auth/login",
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

            window.location.reload();

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Login failed"
            );

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="auth-container">

            <div className="auth-card">

                <h2>Welcome Back</h2>

                <p>
                    Login to your Job Portal account
                </p>

                {error && (
                    <div className="error">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

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

                    <button
                        type="submit"
                        disabled={loading}
                    >

                        {loading
                            ? "Logging in..."
                            : "Login"}

                    </button>

                </form>

                <p className="auth-link">

                    Don't have an account?

                    <Link to="/register">
                        Register
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Login;
