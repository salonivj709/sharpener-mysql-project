const express = require('express');
const db = require('./utils/db-connection');

const studentRoutes = require('./routes/studentRoutes');
const busBookingRoutes = require('./routes/busBookingRoutes');

const app = express();

// Middleware
app.use(express.json());

// Test route
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Student routes
app.use('/students', studentRoutes);

// Bus Booking routes
app.use('/', busBookingRoutes);

// Start server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});