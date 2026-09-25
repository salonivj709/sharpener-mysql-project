const Students = require('./students');
const Users = require('./users');
const Bus = require('./buses');
const Booking = require('./bookings');
const Payment = require('./payments');
const IdentityCard = require('./identitycard');
const department = require('./department');
const studentCourses = require('./studentCourses');
const courses = require('./courses');

// 1-1 Relationship
Students.hasOne(IdentityCard);
IdentityCard.belongsTo(Students);

//1-M association
department.hasMany(Students);
Students.belongsTo(department);

//m-m association
Students.belongsToMany(courses, { through: studentCourses });
courses.belongsToMany(Students, { through: studentCourses });

module.exports = {
    Students,
    Users,
    Bus,
    Booking,
    Payment,
    IdentityCard,
    department,
    studentCourses,
    courses
};