const express = require('express')
const router = express.Router()
const studentController = require('../controllers/student.controller');

// Retrieve all Students
router.get('/', studentController.findAll);

// Create a new student
router.post('/', studentController.create);

// Retrieve a single student with GR_Number
router.get('/:gr_no', studentController.findById);

// Update a student with GR_Number
router.put('/:gr_no', studentController.update);

// Delete a student with GR_Number
router.delete('/:gr_no', studentController.delete);

module.exports = router