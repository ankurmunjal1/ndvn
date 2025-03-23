import React, { useEffect, useState } from "react";
import { fetchOrganizations, createOrganization, registerUser, loginUser } from "./api";

function App() {
    const [organizations, setOrganizations] = useState([]);

    useEffect(() => {
        fetchOrganizations().then(setOrganizations);
    }, []);

    const handleRegister = async () => {
        const user = { name: "John", email: "john@example.com", password: "123456" };
        const result = await registerUser(user);
        console.log(result);
    };

    const handleLogin = async () => {
        const credentials = { email: "john@example.com", password: "123456" };
        const result = await loginUser(credentials);
        console.log(result);
    };

    return (
        <div>
            <h1>Organizations</h1>
            <ul>
                {organizations.map(org => (
                    <li key={org._id}>{org.name}</li>
                ))}
            </ul>
            <button onClick={handleRegister}>Register</button>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default App;
