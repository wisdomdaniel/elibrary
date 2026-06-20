import React, { useState, useEffect } from "react";
import { apiFetch } from "../services/api";

function AdminDashboard() {
    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMaterials = async () => {
            setLoading(true);
            try {
                const data = await apiFetch("/materials");
                setMaterials(data);
            } catch (error) {
                console.error("Failed to fetch materials:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMaterials();
    }, []);

    if (loading) return <div>Loading dashboard...</div>;

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <p>Overview of library materials and statistics.</p>

            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                <div style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
                    <h3>Total Materials</h3>
                    <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{materials.length}</p>
                </div>
                <div style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
                    <h3>Total Downloads</h3>
                    <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
                        {materials.reduce((sum, item) => sum + item.downloads, 0)}
                    </p>
                </div>
            </div>

            <h2>Recent Materials</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th style={{ textAlign: 'left', padding: '8px', border: '1px solid #ddd' }}>Title</th>
                        <th style={{ textAlign: 'left', padding: '8px', border: '1px solid #ddd' }}>Type</th>
                        <th style={{ textAlign: 'left', padding: '8px', border: '1px solid #ddd' }}>Downloads</th>
                    </tr>
                </thead>
                <tbody>
                    {materials.map(item => (
                        <tr key={item.id}>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item.title}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item.type}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item.downloads}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminDashboard;
