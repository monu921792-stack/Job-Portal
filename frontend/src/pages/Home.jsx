import { Link } from "react-router-dom";

function Home() {

    const user = JSON.parse(
        localStorage.getItem("user") || "null"
    );

    return (

        <div className="home">

            <section className="hero">

                <div>

                    <h1>
                        Find Your
                        <br />
                        Dream Job
                    </h1>

                    <p>
                        Search thousands of jobs and
                        find the right opportunity for
                        your career.
                    </p>

                    <Link
                        to="/jobs"
                        className="hero-button"
                    >
                        Search Jobs
                    </Link>

                    {!user && (
                        <Link
                            to="/register"
                            className="secondary-button"
                        >
                            Create Account
                        </Link>
                    )}

                </div>

            </section>

            <section className="features">

                <div className="feature">

                    <h3>
                        🔎 Search Jobs
                    </h3>

                    <p>
                        Find jobs using location,
                        salary, category and experience.
                    </p>

                </div>

                <div className="feature">

                    <h3>
                        📄 Apply Easily
                    </h3>

                    <p>
                        Upload your resume and apply
                        for jobs quickly.
                    </p>

                </div>

                <div className="feature">

                    <h3>
                        📊 Track Applications
                    </h3>

                    <p>
                        Track your application from
                        Applied to Selected.
                    </p>

                </div>

            </section>

        </div>
    );
}

export default Home;