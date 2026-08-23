// Xano BaaS Service Integration
// Configured with environment variable VITE_XANO_API_URL or local storage fallback

const XANO_BASE_URL = import.meta.env.VITE_XANO_API_URL || '';

export const xanoService = {
  // Realtime Upload Material
  uploadMaterial: async (formData) => {
    if (XANO_BASE_URL) {
      const response = await fetch(`${XANO_BASE_URL}/material`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to upload material to Xano BaaS');
      }
      return await response.json();
    }

    // LocalStorage Fallback for real-time local persistence
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
        resolve(newMaterial);
      }, 1000);
    });
  },

  // Student Registration to BaaS
  registerStudent: async (studentData) => {
    if (XANO_BASE_URL) {
      const response = await fetch(`${XANO_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });
      if (!response.ok) {
        throw new Error('Failed to register student on Xano BaaS');
      }
      return await response.json();
    }

    // LocalStorage Fallback
    return new Promise((resolve) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('uni_registered_users') || '[]');
        const newUser = {
          id: Date.now(),
          ...studentData,
          role: 'student'
        };
        users.push(newUser);
        localStorage.setItem('uni_registered_users', JSON.stringify(users));
        resolve(newUser);
      }, 800);
    });
  },

  // Fetch Materials
  getMaterials: async () => {
    if (XANO_BASE_URL) {
      const response = await fetch(`${XANO_BASE_URL}/material`);
      if (response.ok) {
        return await response.json();
      }
    }
    const local = JSON.parse(localStorage.getItem('uni_materials') || '[]');
    return local;
  }
};
