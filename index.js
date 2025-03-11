require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const courseRoutes = require('./routes/courseRoutes');
const Course = require('./models/Course');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());



// MongoDB Connection & Server Start
const startServer = async () => {
  try {
    // Check if MONGODB_URI is defined
    if (!process.env.MONGODB_URI) {
      throw new Error("Missing MONGODB_URI in .env file");
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Seed initial data if the collection is empty
    const count = await Course.countDocuments();
    if (count === 0) {
      await Course.insertMany(initialCourses);
      console.log('📌 Initial courses data seeded successfully');
    }

    // Routes
    app.use('/api', courseRoutes);

    // Start Express Server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });

  } catch (error) {
    console.error('❌ Error starting server:', error.message);
    process.exit(1);
  }
};

// Start Server
startServer();
