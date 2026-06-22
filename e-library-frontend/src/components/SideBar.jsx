import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Pages/context/AuthContext';

const SideBar = () => {
    const { user } = useAuth();

    if (!user) return null;

    return (
        <aside style={{
            width: '200px',
            background: '#f4f4f4',
            height: 'calc(100vh - 60px)',
            padding: '1rem',
            borderRight: '1px solid #ddd'
        }}>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {user.role === 'admin' ? (
                    <>
                        <li style={{ marginBottom: '10px' }}><Link to="/admin">Dashboard</Link></li>
                        <li style={{ marginBottom: '10px' }}><Link to="/admin/manage">Manage Materials</Link></li>
                        <li style={{ marginBottom: '10px' }}><Link to="/admin/upload">Upload New</Link></li>
                    </>
                ) : (
                    <>
                        <li style={{ marginBottom: '10px' }}><Link to="/student">My Dashboard</Link></li>
                        <li style={{ marginBottom: '10px' }}><Link to="/student/profile">My Profile</Link></li>
                    </>
                )}
            </ul>
        </aside>
    );
};

export default SideBar;
