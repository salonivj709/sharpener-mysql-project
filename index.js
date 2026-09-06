const express = require('express')
const mysql = require('mysql2');
const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user:"root",
  password: 'root123',
  database: 'testdb'
})

connection.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log("Database Connected");

    const usersQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255),
            email VARCHAR(255)
        )
    `;

    const busesQuery = `
        CREATE TABLE IF NOT EXISTS buses (
            id INT AUTO_INCREMENT PRIMARY KEY,
            busNumber VARCHAR(255),
            totalSeats INT,
            availableSeats INT
        )
    `;

    const bookingsQuery = `
        CREATE TABLE IF NOT EXISTS bookings (
            id INT AUTO_INCREMENT PRIMARY KEY,
            seatNumber INT
        )
    `;

    const paymentsQuery = `
        CREATE TABLE IF NOT EXISTS payments (
            id INT AUTO_INCREMENT PRIMARY KEY,
            amountPaid INT,
            paymentStatus VARCHAR(255)
        )
    `;

    connection.execute(usersQuery, (err) => {
        if (err) {
            console.log(err);
            return;
        }

        console.log("Users table created");

        connection.execute(busesQuery, (err) => {
            if (err) {
                console.log(err);
                return;
            }

            console.log("Buses table created");

            connection.execute(bookingsQuery, (err) => {
                if (err) {
                    console.log(err);
                    return;
                }

                console.log("Bookings table created");

                connection.execute(paymentsQuery, (err) => {
                    if (err) {
                        console.log(err);
                        return;
                    }

                    console.log("Payments table created");
                });
            });
        });
    });
});

app.get('/',(req, res) => {
  res.send('Hello World')
})

app.listen(3000,(err) => {
  console.log("Server is running")
})
