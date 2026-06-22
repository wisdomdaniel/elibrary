import { apiFetch } from './api';

export const authService = {
    login: async (email, password) => {
        // Mock authentication logic
        const users = [
            { email: "admin@example.com", password: "password1", role: "admin", name: "Admin User" },
            { email: "student@example.com", password: "password2", role: "student", name: "John Student" }
        ];

        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            // In a real app, we would get a token from the backend
            return { success: true, user };
        } else {
            return { success: false, message: "Invalid credentials" };
        }
    },

    register: async (userData) => {
        return apiFetch("/auth/register", {
            method: "POST",
            body: JSON.stringify(userData)
        });
    },

    logout: () => {
        localStorage.removeItem('user');
    }
};
