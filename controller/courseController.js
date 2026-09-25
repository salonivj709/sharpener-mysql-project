const Courses = require('../models/courses');
const Students = require('../models/students');

const addCourse = async (req, res) => {
  try {
    const { name } = req.body;
    const course = await Courses.create({'name': name});

    res.status(201).json(course);
  }
  catch(err){
    res.status(500).json({err: err.message});
  }
}

const addStudentToCourse = async (req, res) => {
  try{
    const { studentId, courseId } = req.body;
    const student = await Students.findByPk(studentId);
    const course = await Courses.findAll({ where: { id: courseId } });
    await student.addCourses(course);
    const updatedStudent = await Students.findByPk(studentId, { include: Courses });
    res.status(201).json(updatedStudent);
  }catch(Err){
    
  }

}

module.exports = {
  addCourse,
  addStudentToCourse
}