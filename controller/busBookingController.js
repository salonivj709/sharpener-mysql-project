const db = require('../utils/db-connection');

// Add User
const addUser = (req, res) => {
    const { name, email } = req.body;

    const query = `
        INSERT INTO users (name, email)
        VALUES (?, ?)
    `;

    db.execute(query, [name, email], (err, result) => {
        if (err) {
            console.log(err.message);
            return res.status(500).send(err.message);
        }

        console.log('User inserted successfully');

        res.status(201).send({
            message: 'User added successfully',
            id: result.insertId
        });
    });
};


// Get All Users
const getUsers = (req, res) => {

    const query = 'SELECT * FROM users';

    db.execute(query, (err, result) => {
        if (err) {
            console.log(err.message);
            return res.status(500).send(err.message);
        }

        console.log('Users retrieved successfully');

        res.status(200).send(result);
    });
};


// Add Bus
const addBus = (req, res) => {
    const { bus_name, bus_number, available_seats } = req.body;

    const query = `
        INSERT INTO buses
        (bus_name, bus_number, available_seats)
        VALUES (?, ?, ?)
    `;

    db.execute(
        query,
        [bus_name, bus_number, available_seats],
        (err, result) => {

            if (err) {
                console.log(err.message);
                return res.status(500).send(err.message);
            }

            console.log('Bus inserted successfully');

            res.status(201).send({
                message: 'Bus added successfully',
                id: result.insertId
            });
        }
    );
};


// Get Buses With More Than Given Seats
const getAvailableBuses = (req, res) => {

    const { seats } = req.params;

    const query = `
        SELECT *
        FROM buses
        WHERE available_seats > ?
    `;

    db.execute(query, [seats], (err, result) => {

        if (err) {
            console.log(err.message);
            return res.status(500).send(err.message);
        }

        console.log('Available buses retrieved successfully');

        res.status(200).send(result);
    });
};


module.exports = {
    addUser,
    getUsers,
    addBus,
    getAvailableBuses
};