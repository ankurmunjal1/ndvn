const Organization = require("../models/Organization");

// Get all organizations
exports.getOrganizations = async (req, res) => {
    try {
        const organizations = await Organization.find();
        res.json(organizations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new organization
exports.createOrganization = async (req, res) => {
    const { name, address, phone, contact } = req.body;
    const newOrg = new Organization({ name, address, phone, contact });

    try {
        const savedOrg = await newOrg.save();
        res.status(201).json(savedOrg);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};