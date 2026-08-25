import { getFilePictorialCover } from './formatGraphicService';

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
    fileName: "CSC301_Data_Structures.docx",
    image: getFilePictorialCover("Data Structures & Algorithms", "docx", "LECTURE NOTE"),
    time: "2 hours ago",
    description: "Learn fundamental Data Structures and Algorithms with C++ implementations.",
    uploadDate: "2024-03-20"
  },
  {
    id: 2,
    title: "Operating Systems Concepts",
    author: "Operating Systems Notes",
    category: "Lecture Note",
    code: "CSC305",
    rating: 4.5,
    fileName: "CSC305_Operating_Systems.pdf",
    image: getFilePictorialCover("Operating Systems Concepts", "pdf", "LECTURE NOTE"),
    time: "5 hours ago",
    description: "Processes, threads, memory management, and file systems.",
    uploadDate: "2024-03-18"
  },
  {
    id: 3,
    title: "Database Management Systems",
    author: "Database Systems Lecture Note",
    category: "Lecture Note",
    code: "CSC307",
    rating: 4.9,
    fileName: "CSC307_Database_Systems.pptx",
    image: getFilePictorialCover("Database Management Systems", "pptx", "LECTURE NOTE"),
    time: "1 day ago",
    description: "Relational algebra, SQL, normalization, and indexing.",
    uploadDate: "2024-03-15"
  },
  {
    id: 4,
    title: "Discrete Mathematics with Applications",
    author: "Discrete Math Past Questions",
    category: "Past Question",
    code: "MTH201",
    rating: 4.7,
    fileName: "MTH201_Discrete_Math_2023.pdf",
    image: getFilePictorialCover("Discrete Mathematics", "pdf", "PAST QUESTION"),
    time: "2 days ago",
    description: "Past examination questions with step-by-step solution guides.",
    uploadDate: "2024-03-10"
  },
  {
    id: 5,
    title: "Artificial Intelligence: A Modern Approach",
    author: "Artificial Intelligence Lecture Note",
    category: "Lecture Note",
    code: "CSC401",
    rating: 4.6,
    fileName: "CSC401_AI_Introduction.docx",
    image: getFilePictorialCover("Artificial Intelligence", "docx", "LECTURE NOTE"),
    time: "3 days ago",
    description: "Introduction to Intelligent Agents, Search Algorithms, and Logic.",
    uploadDate: "2024-03-05"
  }
];

import { xanoService } from './xanoService';

export const authServices = {
  login: async (email, password) => {
    const cleanEmail = (email || '').trim();
    const cleanPassword = (password || '').trim();

    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        // Check static accounts
        if (cleanEmail === "student@uni.com" && cleanPassword === "password") {
          resolve({ id: 1, name: "John Doe", email: cleanEmail, role: "student", faculty: "Faculty of Computing", department: "Computer Science" });
          return;
        }
        if (cleanEmail === "admin@uni.com" && cleanPassword === "password") {
          resolve({ id: 2, name: "Admin User", email: cleanEmail, role: "admin" });
          return;
        }

        // Check registered users in storage
        const registered = JSON.parse(localStorage.getItem('uni_registered_users') || '[]');

        // Strict case-sensitive match for password / Mat No, trimmed matching for email
        const user = registered.find(u =>
          (u.email && u.email.trim() === cleanEmail) &&
          (u.password === cleanPassword || u.matNo === cleanPassword)
        );

        if (user) {
          resolve(user);
        } else {
          try {
            const xanoUser = await xanoService.loginStudent(cleanEmail, cleanPassword);
            if (xanoUser) {
              resolve(xanoUser);
              return;
            }
          } catch (e) {
            // Ignore Xano error
          }
          reject(new Error("Invalid credentials. Enter registered Email and password (Mat No) with exact case matching."));
        }
      }, 400);
    });
  },
  register: async (userData) => {
    const existingUsers = JSON.parse(localStorage.getItem('uni_registered_users') || '[]');

    const cleanUserData = {
      ...userData,
      email: (userData.email || '').trim(),
      matNo: (userData.matNo || '').trim(),
      password: (userData.password || userData.matNo || '').trim()
    };

    const duplicate = existingUsers.find(u => u.email === cleanUserData.email || u.matNo === cleanUserData.matNo);
    if (duplicate) {
      const index = existingUsers.findIndex(u => u.email === cleanUserData.email || u.matNo === cleanUserData.matNo);
      existingUsers[index] = { ...existingUsers[index], ...cleanUserData };
    } else {
      const newUser = { ...cleanUserData, id: Date.now(), role: "student" };
      existingUsers.push(newUser);
    }

    localStorage.setItem('uni_registered_users', JSON.stringify(existingUsers));
    window.dispatchEvent(new Event('storage'));

    try {
      await xanoService.registerStudent(cleanUserData);
    } catch (err) {
      console.log('Xano BaaS Sync Note:', err.message);
    }

    const registeredUser = existingUsers.find(u => u.email === cleanUserData.email) || { ...cleanUserData, id: Date.now(), role: 'student' };
    return registeredUser;
  }
};
