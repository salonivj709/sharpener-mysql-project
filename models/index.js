const Students = require('./students');
const Users = require('./users');
const Bus = require('./buses');
const Booking = require('./bookings');
const Payment = require('./payments');
const IdentityCard = require('./identitycard');
const department = require('./department');

// Relationship
Students.hasOne(IdentityCard);
IdentityCard.belongsTo(Students);

department.hasMany(Students);
Students.belongsTo(department);

module.exports = {
    Students,
    Users,
    Bus,
    Booking,
    Payment,
    IdentityCard,
    department
};