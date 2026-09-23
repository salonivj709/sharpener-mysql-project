// const mysql = require('mysql2');

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user:"root",
//   password: 'root123',
//   database: 'testdb'
// })

// connection.connect((err) => {
//     if (err) {
//         console.log(err);
//         return;
//     }

//     console.log("Database Connected");

//     const createTableQuery = `
//         CREATE TABLE IF NOT EXISTS students (
//             id INT AUTO_INCREMENT PRIMARY KEY,
//             name VARCHAR(255) NOT NULL,
//             email VARCHAR(255) NOT NULL UNIQUE,
//             age INT NOT NULL
//         )
//     `;

//     connection.execute(createTableQuery, (err) => {
//         if (err) {
//             console.log(err.message);
//             return;
//         }

//         console.log('Students table ready');
//     });
// });

// module.exports = connection;


const {Sequelize} = require('sequelize');
const sequelize = new Sequelize('testdb', 'root', 'root123', {
  host: 'localhost',
  dialect: 'mysql'
});

(async() => {try{
    await sequelize.authenticate();
    console.log('Database connection has been created')
}
catch(err){
    console.log(err)
}
})();

module.exports = sequelize;