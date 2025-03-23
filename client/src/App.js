import React, { useEffect, useState } from "react";
import { fetchOrganizations, registerUser, loginUser } from "./api";

function App() {
    const [organizations, setOrganizations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getOrganizations() {
            try {
                const orgs = await fetchOrganizations();
                setOrganizations(Array.isArray(orgs) ? orgs : []); // Ensure it's always an array
            } catch (err) {
                console.error("Error fetching organizations:", err);
                setError("Failed to load organizations.");
            } finally {
                setLoading(false);
            }
        }
        getOrganizations();
    }, []);

    const handleRegister = async () => {
        try {
            const user = { name: "John", email: "john@example.com", password: "123456" };
            const result = await registerUser(user);
            console.log("User registered:", result);
        } catch (err) {
            console.error("Registration error:", err);
        }
    };

    const handleLogin = async () => {
        try {
            const credentials = { email: "john@example.com", password: "123456" };
            const result = await loginUser(credentials);
            console.log("User logged in:", result);
        } catch (err) {
            console.error("Login error:", err);
        }
    };

    return (
        <div>
            <h1>Organizations</h1>

            {loading && <p>Loading organizations...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {!loading && !error && organizations.length === 0 && (
                <p>No organizations found.</p>
            )}

            <ul>
                {organizations.map((org) => (
                    <li key={org._id}>{org.name}</li>
                ))}
            </ul>

            <button onClick={handleRegister}>Register</button>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default App;