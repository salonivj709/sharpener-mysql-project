const db = require('../utils/db-connection');
const { User, Bus } = require("../models");

// Add User
const addUser = async (req, res) => {
    try {
        const { name, email } = req.body;

        const user = await User.create({
            name,
            email
        });

        console.log("User inserted successfully");

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


    // const query = `
    //     INSERT INTO users (name, email)
    //     VALUES (?, ?)
    // `;

    // db.execute(query, [name, email], (err, result) => {
    //     if (err) {
    //         console.log(err.message);
    //         return res.status(500).send(err.message);
    //     }

    //     console.log('User inserted successfully');

    //     res.status(201).send({
    //         message: 'User added successfully',
    //         id: result.insertId
    //     });
    // });



// Get All Users
const getUsers = async (req, res) => {
    try {

        const users = await User.findAll();

        console.log("Users retrieved successfully");

        res.status(200).send(users);

    } catch (err) {
        console.log(err.message);

        res.status(500).send({
            message: "Error retrieving users",
            error: err.message
        });
    }
};
    // const query = 'SELECT * FROM users';

    // db.execute(query, (err, result) => {
    //     if (err) {
    //         console.log(err.message);
    //         return res.status(500).send(err.message);
    //     }

    //     console.log('Users retrieved successfully');

    //     res.status(200).send(result);
    // });



// Add Bus

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

        console.log("Bus inserted successfully");

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
   

    // const query = `
    //     INSERT INTO buses
    //     (bus_name, bus_number, available_seats)
    //     VALUES (?, ?, ?)
    // `;

    // db.execute(
    //     query,
    //     [bus_name, bus_number, available_seats],
    //     (err, result) => {

    //         if (err) {
    //             console.log(err.message);
    //             return res.status(500).send(err.message);
    //         }

    //         console.log('Bus inserted successfully');

    //         res.status(201).send({
    //             message: 'Bus added successfully',
    //             id: result.insertId
    //         });
    //     }
    // );



// Get Buses With More Than Given Seats



const getAvailableBuses = async (req, res) => {
    try {

        const { seats } = req.params;

        const { Op } = require("sequelize");

        const buses = await Bus.findAll({
            where: {
                available_seats: {
                    [Op.gt]: Number(seats)
                }
            }
        });

        console.log("Available buses retrieved successfully");

        res.status(200).send(buses);

    } catch (err) {
        console.log(err.message);

        res.status(500).send({
            message: "Error retrieving available buses",
            error: err.message
        });
    }
};

    // const query = `
    //     SELECT *
    //     FROM buses
    //     WHERE available_seats > ?
    // `;

    // db.execute(query, [seats], (err, result) => {

    //     if (err) {
    //         console.log(err.message);
    //         return res.status(500).send(err.message);
    //     }

    //     console.log('Available buses retrieved successfully');

    //     res.status(200).send(result);
    // });



module.exports = {
    addUser,
    getUsers,
    addBus,
    getAvailableBuses
};