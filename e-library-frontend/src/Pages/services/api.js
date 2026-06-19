// Mock API service to simulate backend calls
const BASE_URL = "https://api.elibrary.example.com";

export const apiFetch = async (endpoint, options = {}) => {
    console.log(`[Mock API] Fetching ${BASE_URL}${endpoint}`);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // For now, this just returns mock data based on the endpoint
    if (endpoint === "/materials") {
        return [
            { id: 1, title: "React for Beginners", type: "PDF", downloads: 120 },
            { id: 2, title: "Advanced JavaScript", type: "Video", downloads: 85 }
        ];
    }

    return { message: "Success" };
};
