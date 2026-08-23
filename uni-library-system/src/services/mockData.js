// Mock data for initial development
export const MOCK_STATS = [
  { label: "Total Materials", value: "1,248", icon: "book", color: "blue" },
  { label: "Departments", value: "23", icon: "building", color: "green" },
  { label: "Courses", value: "156", icon: "graduation", color: "purple" },
  { label: "Total Downloads", value: "3.7K", icon: "download", color: "orange" },
];

export const MOCK_DEPARTMENTS = [
  { name: "Computer Science", materials: 245, icon: "monitor" },
  { name: "Engineering", materials: 312, icon: "settings" },
  { name: "Mathematics", materials: 189, icon: "pi" },
  { name: "Physics", materials: 98, icon: "atom" },
  { name: "Business", materials: 143, icon: "briefcase" },
  { name: "More", materials: "+17 Departments", icon: "layout-grid" },
];

export const MOCK_ANNOUNCEMENTS = [
  {
    id: 1,
    title: "New Materials Uploaded",
    description: "CSC305 Operating Systems notes are now available.",
    time: "2 hours ago",
    type: "new",
    color: "blue"
  },
  {
    id: 2,
    title: "Library Maintenance",
    description: "System maintenance on Sunday, 2:00 AM - 4:00 AM.",
    time: "1 day ago",
    type: "maintenance",
    color: "green"
  },
  {
    id: 3,
    title: "New Feature",
    description: "Advanced search and filter options added.",
    time: "3 days ago",
    type: "feature",
    color: "orange"
  }
];

export const MOCK_POPULAR = [
  { id: 1, title: "Data Structures Notes", code: "CSC301", downloads: "1.2k" },
  { id: 2, title: "Database Systems Notes", code: "CSC307", downloads: "980" },
  { id: 3, title: "Discrete Math Past Qs", code: "MTH201", downloads: "876" },
];

export const MOCK_MATERIALS = [
  {
    id: 1,
    title: "Data Structures and Algorithms in C++",
    author: "Data Structures Lecture Note",
    category: "Lecture Note",
    code: "CSC301",
    rating: 4.8,
    image: "https://placehold.co/300x400/58348C/white?text=Data+Structures",
    time: "2 hours ago",
    description: "Learn the latest features of React 19.",
    uploadDate: "2024-03-20"
  },
  {
    id: 2,
    title: "Operating Systems Concepts",
    author: "Operating Systems Notes",
    category: "Lecture Note",
    code: "CSC305",
    rating: 4.5,
    image: "https://placehold.co/300x400/0A4E8B/white?text=Operating+Systems",
    time: "5 hours ago",
    description: "Master Tailwind and advanced CSS techniques.",
    uploadDate: "2024-03-18"
  },
  {
    id: 3,
    title: "Database Management Systems",
    author: "Database Systems Lecture Note",
    category: "Lecture Note",
    code: "CSC307",
    rating: 4.9,
    image: "https://placehold.co/300x400/2E6B5E/white?text=Database+Systems",
    time: "1 day ago",
    description: "Comprehensive guide to DSA.",
    uploadDate: "2024-03-15"
  },
  {
    id: 4,
    title: "Discrete Mathematics with Applications",
    author: "Discrete Math Past Questions",
    category: "Past Question",
    code: "MTH201",
    rating: 4.7,
    image: "https://placehold.co/300x400/A11D33/white?text=Discrete+Math",
    time: "2 days ago",
    description: "Principles of great user interface design.",
    uploadDate: "2024-03-10"
  },
  {
    id: 5,
    title: "Artificial Intelligence: A Modern Approach",
    author: "Artificial Intelligence Lecture Note",
    category: "Lecture Note",
    code: "CSC401",
    rating: 4.6,
    image: "https://placehold.co/300x400/0F172A/white?text=Artificial+Intelligence",
    time: "3 days ago",
    description: "Introduction to AI.",
    uploadDate: "2024-03-05"
  }
];

export const authServices = {
  login: async (email, password) => {
    // Mock login logic
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === "student@uni.com" && password === "password") {
          resolve({ id: 1, name: "John Doe", email, role: "student" });
        } else if (email === "admin@uni.com" && password === "password") {
          resolve({ id: 2, name: "Admin User", email, role: "admin" });
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 500);
    });
  },
  register: async (userData) => {
    // Save locally or to Xano BaaS
    const users = JSON.parse(localStorage.getItem('uni_registered_users') || '[]');
    const newUser = { ...userData, id: Date.now(), role: "student" };
    users.push(newUser);
    localStorage.setItem('uni_registered_users', JSON.stringify(users));
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(newUser);
      }, 500);
    });
  }
};
