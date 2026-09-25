const express = require('express');
const db = require('./utils/db-connection');

const studentsRoutes = require('./routes/studentsRoutes');
const studentRoutes = require('./routes/studentRoutes');
const busBookingRoutes = require('./routes/busBookingRoutes');

// const studentModel = require('./models/students');
// const User = require("./models/users");
// const Bus = require("./models/buses");
// const Booking = require("./models/bookings");
// const Payment = require("./models/payments");

require('./models');

const app = express();

// Middleware
app.use(express.json());

// Test route
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Student routes
app.use('/student', studentRoutes);

// Students Management
app.use('/students', studentsRoutes);


// Bus Booking routes
app.use('/', busBookingRoutes);

db.sync({force:true}).then((err) => {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
}).catch((err) => {
  console.log(err);
})

// Start server
