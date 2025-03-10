const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

// User Schema
const userSchema = new mongoose.Schema({
  spocName: String,
  email: String,
  organization: String,
  state: String,
  address: String,
  phone: String, // Mobile number set as password during registration
  pin: String,
});

// User Model
const User = mongoose.model('User', userSchema);

// Routes for registration and login
app.post('/register', async (req, res) => {
  const { spocName, email, organization, state, address, phone, pin } = req.body;

  try {
    const newUser = new User({ spocName, email, organization, state, address, phone, pin });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!', user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/login', async (req, res) => {
  const { spocName, password } = req.body;

  try {
    const user = await User.findOne({ spocName, phone: password }); // Password is the phone number
    if (user) {
      res.status(200).json({ message: 'Login successful!', user });
    } else {
      res.status(400).json({ message: 'Invalid credentials!' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});