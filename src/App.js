import React, { useState } from "react";
import "./App.css"; // Ensure your styles are imported

function App() {
  // State for user details
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationDetails, setRegistrationDetails] = useState({
    spocName: "",
    email: "",
    organization: "",
    state: "",
    address: "",
    phone: "",
    pin: "",
  });
  const [newPassword, setNewPassword] = useState(""); // New password for the user
  const [selectedCard, setSelectedCard] = useState(null); // Track selected card

  // Handle changes in registration form
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegistrationDetails({
      ...registrationDetails,
      [name]: value,
    });
  };

  // Handle registration form submission
  const handleRegister = () => {
    if (
      registrationDetails.spocName &&
      registrationDetails.email &&
      registrationDetails.organization &&
      registrationDetails.state &&
      registrationDetails.address &&
      registrationDetails.phone &&
      registrationDetails.pin
    ) {
      // Set the mobile number as the password after registration
      const password = registrationDetails.phone;
      setProfile({
        ...registrationDetails,
        password, // Setting mobile number as password
      });
      alert("Registration successful! Your mobile number has been set as your password.");
      setIsRegistering(false); // Switch to login form after registration
    } else {
      alert("Please fill out all fields.");
    }
  };

  // Handle login form submission
  const handleLogin = () => {
    if (username === registrationDetails.spocName && password === profile?.password) {
      setIsLoggedIn(true);
    } else {
      alert("Invalid username or password!");
    }
  };

  // Handle logout
  const handleLogout = () => {
    setProfile(null);
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
  };

  // Handle password change
  const handlePasswordChange = () => {
    if (newPassword) {
      setProfile({ ...profile, password: newPassword });
      setNewPassword("");
      alert("Password updated successfully!");
    } else {
      alert("Please enter a valid password.");
    }
  };

  // Dashboard Card Layout
  const renderDashboard = () => (
    <div className="dashboard-cards">
      <div
        className={`card ${selectedCard === "profile" ? "selected" : ""}`}
        onClick={() => setSelectedCard("profile")}
      >
        <h3>My Profile</h3>
        <p><strong>Name:</strong> {profile?.spocName}</p>
        <p><strong>Email:</strong> {profile?.email}</p>
        <p><strong>Organization:</strong> {profile?.organization}</p>
      </div>
      <div
        className={`card ${selectedCard === "submittedData" ? "selected" : ""}`}
        onClick={() => setSelectedCard("submittedData")}
      >
        <h3>My Submitted Data</h3>
        <p>No data submitted yet.</p>
      </div>
      <div
        className={`card ${selectedCard === "invoice" ? "selected" : ""}`}
        onClick={() => setSelectedCard("invoice")}
      >
        <h3>Invoice</h3>
        <p>No invoices yet.</p>
      </div>
    </div>
  );

  return (
    <div className="App">
      <h1>National Document Verification Network Organization Dashboard</h1>

      {!isLoggedIn ? (
        <>
          {!isRegistering ? (
            // Login form
            <div>
              <h2>Login</h2>
              <input
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <br />
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <button onClick={handleLogin}>Login</button>
              <p>
                Don't have an account?{" "}
                <button onClick={() => setIsRegistering(true)}>Register</button>
              </p>
            </div>
          ) : (
            // Registration form
            <div>
              <h2>Register</h2>
              <input
                type="text"
                name="spocName"
                placeholder="SPOC Name"
                value={registrationDetails.spocName}
                onChange={handleRegisterChange}
              />
              <br />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={registrationDetails.email}
                onChange={handleRegisterChange}
              />
              <br />
              <input
                type="text"
                name="organization"
                placeholder="Organization"
                value={registrationDetails.organization}
                onChange={handleRegisterChange}
              />
              <br />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={registrationDetails.state}
                onChange={handleRegisterChange}
              />
              <br />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={registrationDetails.address}
                onChange={handleRegisterChange}
              />
              <br />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={registrationDetails.phone}
                onChange={handleRegisterChange}
              />
              <br />
              <input
                type="text"
                name="pin"
                placeholder="Pin"
                value={registrationDetails.pin}
                onChange={handleRegisterChange}
              />
              <br />
              <button onClick={handleRegister}>Register</button>
              <p>
                Already have an account?{" "}
                <button onClick={() => setIsRegistering(false)}>Login</button>
              </p>
            </div>
          )}
        </>
      ) : (
        // User profile page and dashboard
        <div>
          <div className="dashboard-header">
            <h2>Welcome, {profile.spocName}!</h2>
          </div>

          {renderDashboard()}

          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default App;