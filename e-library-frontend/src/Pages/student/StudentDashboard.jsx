import React, { useState, useEffect } from "react";
import { apiFetch } from "../services/api";

function StudentDashboard() {
    const [availableBooks, setAvailableBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true);
            try {
                const data = await apiFetch("/books");
                setAvailableBooks(data);
            } catch (error) {
                console.error("Failed to fetch books:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    if (loading) return <div>Loading library...</div>;

    const filteredBooks = availableBooks.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <h1>Student Library</h1>
            <p>Welcome to your digital library. Search and explore available materials.</p>

            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Search by title or author..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                {filteredBooks.length > 0 ? (
                    filteredBooks.map(book => (
                        <div key={book.id} style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px', background: '#fff' }}>
                            <h3>{book.title}</h3>
                            <p><strong>Author:</strong> {book.author}</p>
                            <p><strong>Category:</strong> {book.category}</p>
                            <button style={{
                                width: '100%',
                                padding: '8px',
                                background: '#007bff',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}>
                                Read Now
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No books found matching your search.</p>
                )}
            </div>
        </div>
    );
}

export default StudentDashboard;
