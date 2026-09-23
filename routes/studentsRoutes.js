const express = require('express');

const studentController =
    require('../controller/studentsController');

const router = express.Router();


// Add student
router.post('/', studentController.addStudent);


// Get all students
router.get('/', studentController.getStudents);


// Get student by ID
router.get('/:id', studentController.getStudentById);


// Update student
router.put('/:id', studentController.updateStudent);


// Delete student
router.delete('/:id', studentController.deleteStudent);


module.exports = router;