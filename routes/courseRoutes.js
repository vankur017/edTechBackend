const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// GET all courses
router.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/courses/:courseId', async (req, res) => {
  try {
    const course = await Course.findOne({ courseId: req.params.courseId }); // ✅ Use courseId
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// Admin route to add a new course
router.post('/admin/courses', async (req, res) => {
  const course = new Course(req.body);
  try {
    const newCourse = await course.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Admin route to update a course by ID


router.put('/admin/courses/:courseId', async (req, res) => {
  try {
    const updatedCourse = await Course.findOneAndUpdate(
      { courseId: req.params.courseId },  // ✅ Find by courseId instead of _id
      req.body,
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(updatedCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});




module.exports = router;
