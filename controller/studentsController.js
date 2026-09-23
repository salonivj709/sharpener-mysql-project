const db = require('../utils/db-connection');


// =========================
// ADD STUDENT
// POST /students
// =========================
const addStudent = (req, res) => {

    const { name, email, age } = req.body;

    if (!name || !email || age === undefined) {
        return res.status(400).send('Name, email and age are required');
    }

    const insertQuery = `
        INSERT INTO students (name, email, age)
        VALUES (?, ?, ?)
    `;

    db.execute(
        insertQuery,
        [name, email, age],
        (err, result) => {

            if (err) {
                console.log(err.message);

                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(409).send('Email already exists');
                }

                return res.status(500).send(err.message);
            }

            console.log('Student inserted successfully');

            res.status(201).send({
                message: 'Student added successfully',
                id: result.insertId
            });
        }
    );
};


// =========================
// GET ALL STUDENTS
// GET /students
// =========================
const getStudents = (req, res) => {

    const query = 'SELECT * FROM students';

    db.execute(query, (err, result) => {

        if (err) {
            console.log(err.message);
            return res.status(500).send(err.message);
        }

        console.log('Students retrieved successfully');

        res.status(200).send(result);
    });
};


// =========================
// GET STUDENT BY ID
// GET /students/:id
// =========================
const getStudentById = (req, res) => {

    const { id } = req.params;

    const query = 'SELECT * FROM students WHERE id = ?';

    db.execute(query, [id], (err, result) => {

        if (err) {
            console.log(err.message);
            return res.status(500).send(err.message);
        }

        if (result.length === 0) {
            return res.status(404).send('Student not found');
        }

        console.log('Student retrieved successfully');

        res.status(200).send(result[0]);
    });
};


// =========================
// UPDATE STUDENT
// PUT /students/:id
// =========================
const updateStudent = (req, res) => {

    const { id } = req.params;
    const { name, email, age } = req.body;

    if (!name || !email || age === undefined) {
        return res.status(400).send('Name, email and age are required');
    }

    const query = `
        UPDATE students
        SET name = ?, email = ?, age = ?
        WHERE id = ?
    `;

    db.execute(
        query,
        [name, email, age, id],
        (err, result) => {

            if (err) {
                console.log(err.message);

                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(409).send('Email already exists');
                }

                return res.status(500).send(err.message);
            }

            if (result.affectedRows === 0) {
                return res.status(404).send('Student not found');
            }

            console.log('Student updated successfully');

            res.status(200).send('Student updated successfully');
        }
    );
};


// =========================
// DELETE STUDENT
// DELETE /students/:id
// =========================
const deleteStudent = (req, res) => {

    const { id } = req.params;

    const query = 'DELETE FROM students WHERE id = ?';

    db.execute(query, [id], (err, result) => {

        if (err) {
            console.log(err.message);
            return res.status(500).send(err.message);
        }

        if (result.affectedRows === 0) {
            return res.status(404).send('Student not found');
        }

        console.log('Student deleted successfully');

        res.status(200).send('Student deleted successfully');
    });
};


module.exports = {
    addStudent,
    getStudents,
    getStudentById,
    updateStudent,
    deleteStudent
};