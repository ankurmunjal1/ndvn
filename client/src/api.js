const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const fetchOrganizations = async () => {
    try {
        const response = await fetch(`${API_URL}/organizations`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching organizations:", error);
    }
};

export const createOrganization = async (organizationData) => {
    try {
        const response = await fetch(`${API_URL}/api/organizations`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(organizationData),
        });
        return await response.json();
    } catch (error) {
        console.error("Error creating organization:", error);
    }
};

export const registerUser = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });
        return await response.json();
    } catch (error) {
        console.error("Error registering user:", error);
    }
};

export const loginUser = async (credentials) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
        return await response.json();
    } catch (error) {
        console.error("Error logging in:", error);
    }
};