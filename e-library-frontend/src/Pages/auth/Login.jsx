import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    // Mock users for now (as you had them)
    const users = [
        { email: "admin@example.com", password: "password1", role: "admin" },
        { email: "student@example.com", password: "password2", role: "student" }
    ];

    function handleSubmit(e) {
        e.preventDefault();

        const user = users.find((u) => u.email === email && u.password === password);

        if (user) {
            login(user);
            if (user.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/student");
            }
        } else {
            alert("Invalid email or password");
        }
    }

    return (
        <div style={{ padding: "20px" }}>
            <h1>E-Library Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <br />
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <br />
                <div>
                    <label htmlFor="password">Password:</label>
                    <br />
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <br />
                <button type="submit">Login</button>
                <p>
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </form>
        </div>
    );
}

export default Login;
