// Xano BaaS Service Integration & Local Fallback Layer

const XANO_BASE_URL = import.meta.env.VITE_XANO_API_URL || '';

export const xanoService = {
  // Realtime Upload Material with Faculty batching
  uploadMaterial: async (formData) => {
    if (XANO_BASE_URL) {
      const response = await fetch(`${XANO_BASE_URL}/material`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to upload material to Xano BaaS');
      return await response.json();
    }

    // LocalStorage Fallback with real-time storage event trigger
    return new Promise((resolve) => {
      setTimeout(() => {
        const existing = JSON.parse(localStorage.getItem('uni_materials') || '[]');
        const newMaterial = {
          id: Date.now(),
          ...formData,
          rating: 5.0,
          image: "https://placehold.co/300x400/334155/white?text=" + encodeURIComponent(formData.title || 'Material'),
          time: 'Just now',
          uploadDate: new Date().toISOString().split('T')[0]
        };
        existing.unshift(newMaterial);
        localStorage.setItem('uni_materials', JSON.stringify(existing));

        // Create log entry
        const logs = JSON.parse(localStorage.getItem('uni_system_logs') || '[]');
        logs.unshift({
          id: Date.now(),
          title: 'Material Uploaded',
          desc: `Uploaded "${formData.title}" (${formData.code || 'N/A'}) to ${formData.faculty || 'Faculty of Computing'}`,
          time: 'Just now'
        });
        localStorage.setItem('uni_system_logs', JSON.stringify(logs));

        window.dispatchEvent(new Event('storage'));
        resolve(newMaterial);
      }, 500);
    });
  },

  // Student Registration to BaaS
  registerStudent: async (studentData) => {
    if (XANO_BASE_URL) {
      const response = await fetch(`${XANO_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentData),
      });
      if (!response.ok) throw new Error('Failed to register student on Xano BaaS');
      return await response.json();
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('uni_registered_users') || '[]');
        const existingIndex = users.findIndex(u => u.email === studentData.email || u.matNo === studentData.matNo);
        let newUser;
        if (existingIndex >= 0) {
          newUser = { ...users[existingIndex], ...studentData };
          users[existingIndex] = newUser;
        } else {
          newUser = {
            id: Date.now(),
            ...studentData,
            role: 'student'
          };
          users.push(newUser);
        }
        localStorage.setItem('uni_registered_users', JSON.stringify(users));

        // Create log entry
        const logs = JSON.parse(localStorage.getItem('uni_system_logs') || '[]');
        logs.unshift({
          id: Date.now(),
          title: 'New Student Registered',
          desc: `${studentData.name} (${studentData.matNo}) registered under ${studentData.faculty}`,
          time: 'Just now'
        });
        localStorage.setItem('uni_system_logs', JSON.stringify(logs));

        window.dispatchEvent(new Event('storage'));
        resolve(newUser);
      }, 300);
    });
  },

  // Student Login from BaaS
  loginStudent: async (email, password) => {
    if (XANO_BASE_URL) {
      const response = await fetch(`${XANO_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) throw new Error('Invalid credentials on Xano BaaS');
      return await response.json();
    }
    return null;
  },

  // Update Profile
  updateProfile: async (userId, profileData) => {
    if (XANO_BASE_URL) {
      const response = await fetch(`${XANO_BASE_URL}/user/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData),
      });
      if (!response.ok) throw new Error('Failed to update profile on Xano BaaS');
      return await response.json();
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        const currentUser = JSON.parse(localStorage.getItem('uni_current_user') || '{}');
        const updated = { ...currentUser, ...profileData };
        localStorage.setItem('uni_current_user', JSON.stringify(updated));
        window.dispatchEvent(new Event('storage'));
        resolve(updated);
      }, 300);
    });
  },

  // Realtime Announcements
  getAnnouncements: async () => {
    if (XANO_BASE_URL) {
      const response = await fetch(`${XANO_BASE_URL}/announcements`);
      if (response.ok) return await response.json();
    }
    const local = JSON.parse(localStorage.getItem('uni_announcements') || '[]');
    if (local.length === 0) {
      return [
        { id: 1, title: 'Exam Timetable Published', description: 'Faculty exam schedules are now available in your portal.', time: '1 hour ago' },
        { id: 2, title: 'UNIBEN Library Portal Online', description: 'Real-time faculty batching & e-reading features are active.', time: '3 hours ago' },
        { id: 3, title: 'New Course Notes Added', description: 'CSC301 and MTH201 updated notes uploaded.', time: '1 day ago' }
      ];
    }
    return local;
  },

  // Realtime System Activity Logs for Admin Dashboard
  getSystemLogs: async () => {
    if (XANO_BASE_URL) {
      const response = await fetch(`${XANO_BASE_URL}/logs`);
      if (response.ok) return await response.json();
    }
    const local = JSON.parse(localStorage.getItem('uni_system_logs') || '[]');
    if (local.length === 0) {
      return [
        { id: 1, title: 'Material Uploaded', desc: 'Admin uploaded "Data Structures in C++"', time: '2 hours ago' },
        { id: 2, title: 'New Student Registered', desc: 'John Doe registered under Faculty of Computing', time: '4 hours ago' },
        { id: 3, title: 'System Security Audit', desc: 'Role permissions and batching verified', time: '1 day ago' }
      ];
    }
    return local;
  }
};
