const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Organization Schema
const OrganizationSchema = new mongoose.Schema({
    name: String,
    address: String,
    phone: String,
    contact: String
});

const Organization = mongoose.model('Organization', OrganizationSchema);

// User Schema
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

const User = mongoose.model('User', UserSchema);

// Routes for Organizations
app.get('/organizations', async (req, res) => {
    try {
        const organizations = await Organization.find();
        res.json(organizations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/organizations', async (req, res) => {
    const { name, address, phone, contact } = req.body;
    const newOrg = new Organization({ name, address, phone, contact });
    
    try {
        const savedOrg = await newOrg.save();
        res.status(201).json(savedOrg);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// User Registration
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// User Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not found!' });
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials!' });
        
        res.status(200).json({ message: 'Login successful!', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
