// app/lib/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    return; // Already connected
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};

module.exports = connectDB;