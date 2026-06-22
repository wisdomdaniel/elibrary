import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Pages/context/AuthContext';

const NavBar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '1rem',
            background: '#333',
            color: '#fff'
        }}>
            <div>
                <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>
                    📚 E-Library
                </Link>
            </div>
            <div>
                {user ? (
                    <>
                        <span style={{ marginRight: '1rem' }}>Welcome, {user.role}!</span>
                        <button onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</button>
                    </>
                ) : (
                    <Link to="/" style={{ color: '#fff' }}>Login</Link>
                )}
            </div>
        </nav>
    );
};

export default NavBar;
