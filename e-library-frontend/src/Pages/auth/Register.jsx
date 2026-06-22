import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'student' // Default role
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Since we have no backend, we'll just simulate a successful registration
        console.log("Registered User:", formData);
        alert("Registration successful! Please login.");
        navigate("/");
    };

    return (
        <div>
            <h1>Create Account</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label><br/>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                </div>
                <br/>
                <div>
                    <label>Email:</label><br/>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <br/>
                <div>
                    <label>Password:</label><br/>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <br/>
                <div>
                    <label>Register as:</label><br/>
                    <select name="role" value={formData.role} onChange={handleChange}>
                        <option value="student">Student</option>
                        <option value="admin">Administrator</option>
                    </select>
                </div>
                <br/>
                <button type="submit">Register</button>
                <p>
                    Already have an account? <Link to="/">Login</Link>
                </p>
            </form>
        </div>
    );
}

export default Register;
