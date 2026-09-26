const express = require('express');

const busBookingController =
    require('../controller/busBookingController');

const router = express.Router();


router.post(
    '/users',
    busBookingController.addUser
);

router.get(
    '/users',
    busBookingController.getUsers
);


router.post(
    '/buses',
    busBookingController.addBus
);

router.get(
    '/buses/available/:seats',
    busBookingController.getAvailableBuses
);


router.post(
    '/bookings',
    busBookingController.createBooking
);

router.get(
    '/users/:id/bookings',
    busBookingController.getUserBookings
);


router.get(
    '/buses/:id/bookings',
    busBookingController.getBusBookings
);


module.exports = router;