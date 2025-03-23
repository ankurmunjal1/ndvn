const mongoose = require("mongoose");

const OrganizationSchema = new mongoose.Schema({
    name: String,
    address: String,
    phone: String,
    contact: String,
});

module.exports = mongoose.model("Organization", OrganizationSchema);