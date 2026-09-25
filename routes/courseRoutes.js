const express = require('express');
const courseController = require('../controller/courseController');

const router = express.Router();

router.post('/addcourse', courseController.addCourse);
router.get('/addstudenttocourse', courseController.addStudentToCourse);

module.exports = router;