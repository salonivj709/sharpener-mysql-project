const db = require("../utils/db-connection");

const {
    Users,
    Bus,
    Booking
} = require("../models");

// ===============================
// ADD USER
// ===============================

const addUser = async (req, res) => {
    try {
        const { name, email } = req.body;

        const user = await Users.create({
            name,
            email
        });

        res.status(201).send({
            message: "User added successfully",
            data: user
        });

    } catch (err) {
        console.log(err.message);

        res.status(500).send({
            message: "Error adding user",
            error: err.message
        });
    }
};


// ===============================
// GET ALL USERS
// ===============================

const getUsers = async (req, res) => {
    try {

        const users = await Users.findAll();

        res.status(200).send({
            message: "Users fetched successfully",
            data: users
        });

    } catch (err) {

        res.status(500).send({
            message: "Error fetching users",
            error: err.message
        });

    }
};


// ===============================
// ADD BUS
// ===============================

const addBus = async (req, res) => {
    try {

        const {
            bus_name,
            bus_number,
            available_seats
        } = req.body;

        const bus = await Bus.create({
            bus_name,
            bus_number,
            available_seats
        });

        res.status(201).send({
            message: "Bus added successfully",
            data: bus
        });

    } catch (err) {

        console.log(err.message);

        res.status(500).send({
            message: "Error adding bus",
            error: err.message
        });

    }
};


// ===============================
// GET AVAILABLE BUSES
// ===============================

const getAvailableBuses = async (req, res) => {
    try {

        const seats = Number(req.params.seats);

        const buses = await Bus.findAll({
            where: {
                available_seats: {
                    [require("sequelize").Op.gte]: seats
                }
            }
        });

        res.status(200).send({
            message: "Available buses fetched successfully",
            data: buses
        });

    } catch (err) {

        res.status(500).send({
            message: "Error fetching available buses",
            error: err.message
        });

    }
};


// ===============================
// CREATE BOOKING
// ===============================

const createBooking = async (req, res) => {
    try {

        const {
            user_id,
            bus_id,
            seats_booked
        } = req.body;

        // Check user
        const user = await Users.findByPk(user_id);

        if (!user) {
            return res.status(404).send({
                message: "User not found"
            });
        }

        // Check bus
        const bus = await Bus.findByPk(bus_id);

        if (!bus) {
            return res.status(404).send({
                message: "Bus not found"
            });
        }

        // Check available seats
        if (bus.available_seats < seats_booked) {
            return res.status(400).send({
                message: "Not enough seats available"
            });
        }

        // Create booking
        const booking = await Booking.create({
            user_id,
            bus_id,
            seats_booked
        });

        // Reduce available seats
        await bus.update({
            available_seats: bus.available_seats - seats_booked
        });

        res.status(201).send({
            message: "Booking created successfully",
            data: booking
        });

    } catch (err) {

        console.log(err.message);

        res.status(500).send({
            message: "Error creating booking",
            error: err.message
        });

    }
};


// ===============================
// GET BOOKINGS FOR USER
// ===============================

const getUserBookings = async (req, res) => {
    try {

        const userId = req.params.id;

        const bookings = await Booking.findAll({
            where: {
                user_id: userId
            },

            include: [
                {
                    model: Bus
                }
            ]
        });

        res.status(200).send({
            message: "User bookings fetched successfully",
            data: bookings
        });

    } catch (err) {

        console.log(err.message);

        res.status(500).send({
            message: "Error fetching user bookings",
            error: err.message
        });

    }
};


// ===============================
// GET BOOKINGS FOR BUS
// ===============================

const getBusBookings = async (req, res) => {
    try {

        const busId = req.params.id;

        const bookings = await Booking.findAll({
            where: {
                bus_id: busId
            },

            include: [
                {
                    model: Users,
                    attributes: ["id", "name", "email"]
                }
            ]
        });

        res.status(200).send({
            message: "Bus bookings fetched successfully",
            data: bookings
        });

    } catch (err) {

        console.log(err.message);

        res.status(500).send({
            message: "Error fetching bus bookings",
            error: err.message
        });

    }
};


module.exports = {
    addUser,
    getUsers,
    addBus,
    getAvailableBuses,
    createBooking,
    getUserBookings,
    getBusBookings
};