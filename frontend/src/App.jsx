import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {

    const user = JSON.parse(
        localStorage.getItem("user") || "null"
    );

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/";
    };

    return (

        <>

            <nav className="navbar">

                <Link
                    to="/"
                    className="logo"
                >
                    JobPortal
                </Link>

                <div className="nav-links">

                    <Link to="/">
                        Home
                    </Link>

                    <Link to="/jobs">
                        Jobs
                    </Link>

                    {user ? (

                        <>

                            <Link to="/profile">
                                Profile
                            </Link>

                            {user.role === "jobseeker" && (

                                <Link to="/applications">
                                    My Applications
                                </Link>

                            )}

                            {user.role === "recruiter" && (

                                <Link to="/recruiter">
                                    Recruiter Dashboard
                                </Link>

                            )}

                            {user.role === "admin" && (

                                <Link to="/admin">
                                    Admin Dashboard
                                </Link>

                            )}

                            <button
                                onClick={logout}
                                className="logout"
                            >
                                Logout
                            </button>

                        </>

                    ) : (

                        <>

                            <Link to="/login">
                                Login
                            </Link>

                            <Link to="/register">
                                Register
                            </Link>

                        </>

                    )}

                </div>

            </nav>

            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

            </Routes>

        </>

    );
}

export default App;