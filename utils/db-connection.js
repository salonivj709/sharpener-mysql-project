const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user:"root",
  password: 'root123',
  database: 'bus_booking'
})

connection.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log("Database Connected");

//    const studentsQuery = `
//     CREATE TABLE IF NOT EXISTS students (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         name VARCHAR(255),
//         email VARCHAR(255)
//     )
// `;

//    connection.execute(studentsQuery, (err) => {
//         if (err) {
//             console.log(err);
//             return;
//         }

//        console.log("Students table created");
//     });
});

module.exports = connection;