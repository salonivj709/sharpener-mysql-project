const db = require('../utils/db-connection');

const addEntries = (req, res) => {
    const { email, name } = req.body;

    const insertQuery =
        'INSERT INTO students (email, name) VALUES (?, ?)';

    db.execute(insertQuery, [email, name], (err) => {
        if (err) {
            console.log(err.message);
            return res.status(500).send(err.message);
        }

        console.log('Data inserted successfully');

        res.status(200).send(
            `Student with name ${name} added successfully`
        );
    });
};
const updatEntry = (req,res) => {
  const {id} = req.params;
  const {name} = req.body;
  const updateQuery = "UPDATE students set name = ? where id = ?";

  db.execute(updateQuery,[name,id],(err) => {
    if(err){
      console.log(err.message);
      res.status(500).send(err.message);
      db.end();
      return;
    }

    if(res.affectedRows === 0){
      res.status(404).send("Student not found");
      return;
    }
    res.status(200).send("User has been Updated successfully");
  })
}

const deleteEntry = (req,res) => {
  const {id} = req.params;
  const delQuery = "DELETE FROM students WHERE id = ?";

  db.execute(delQuery, [id], (err, result) => {
    if(err){
      console.log(err.message);
      res.status(500).send(err.message);
      db.end();
      return;
    }

    if(result.affectedRows === 0){
      res.status(404).send("Student not found");
      return;
    }
    res.status(200).send("Student has been deleted successfully");
  })
}
module.exports = { 
  addEntries,
  updatEntry,
  deleteEntry,
 };