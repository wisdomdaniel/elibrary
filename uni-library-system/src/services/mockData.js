// Mock data for initial development
export const MOCK_MATERIALS = [
  {
    id: 1,
    title: "Introduction to React 19",
    author: "Jane Doe",
    category: "Technology",
    rating: 4.8,
    image: "https://placehold.co/300x400/4F46E5/white?text=React+19",
    description: "Learn the latest features of React 19.",
    uploadDate: "2024-03-20"
  },
  {
    id: 2,
    title: "Advanced CSS Patterns",
    author: "John Smith",
    category: "Design",
    rating: 4.5,
    image: "https://placehold.co/300x400/06B6D4/white?text=CSS+Patterns",
    description: "Master Tailwind and advanced CSS techniques.",
    uploadDate: "2024-03-18"
  },
  {
    id: 3,
    title: "Data Structures & Algorithms",
    author: "Michael Brown",
    category: "Computer Science",
    rating: 4.9,
    image: "https://placehold.co/300x400/10B981/white?text=DSA",
    description: "Comprehensive guide to DSA.",
    uploadDate: "2024-03-15"
  },
  {
    id: 4,
    title: "UI/UX Fundamentals",
    author: "Sarah Wilson",
    category: "Design",
    rating: 4.7,
    image: "https://placehold.co/300x400/F59E0B/white?text=UI/UX",
    description: "Principles of great user interface design.",
    uploadDate: "2024-03-10"
  }
];

export const authServices = {
  login: async (email, password) => {
    // Mock login logic
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === "student@uni.edu" && password === "password") {
          resolve({ id: 1, name: "Student User", email, role: "student" });
        } else if (email === "admin@uni.edu" && password === "password") {
          resolve({ id: 2, name: "Admin User", email, role: "admin" });
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 500);
    });
  },
  register: async (userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ...userData, id: Date.now(), role: "student" });
      }, 500);
    });
  }
};
