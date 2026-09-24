const db = require('../utils/db-connection');
const Student = require('../models/students');

const addEntries = async (req, res) => {
  try{
    const { email, name } = req.body;
    const student = await Student.create({
      email:email, 
      name:name
    });
    res.status(201).send(`Student with name ${name} added successfully`);
  }
  catch(err){
    res.status(500).send("Unable to make entry in the database");
  }



    // const insertQuery =
    //     'INSERT INTO students (email, name) VALUES (?, ?)';

    // db.execute(insertQuery, [email, name], (err) => {
    //     if (err) {
    //         console.log(err.message);
    //         return res.status(500).send(err.message);
    //     }

    //     console.log('Data inserted successfully');

    //     res.status(200).send(
    //         `Student with name ${name} added successfully`
    //     );
    // });
};
const updatEntry = async (req,res) => {
  try{
  const {id} = req.params;
  const {name} = req.body;
  const student = await Student.findByPk(id);
  if(!student){
    res.status(404).send("Student not found");
  }
  student.name = name;
  await student.save();
  res.status(200).send(`Student with name ${name} updated successfully`);
}catch(err){
  res.status(500).send("Unable to update the entry in the database");
}
}


  // const updateQuery = "UPDATE students set name = ? where id = ?";

  // db.execute(updateQuery,[name,id],(err) => {
  //   if(err){
  //     console.log(err.message);
  //     res.status(500).send(err.message);
  //     db.end();
  //     return;
  //   }

  //   if(res.affectedRows === 0){
  //     res.status(404).send("Student not found");
  //     return;
  //   }
  //   res.status(200).send("User has been Updated successfully");
  // })


const deleteEntry = async (req, res) => {
  try{
    const {id} = req.params;
    const student = await Student.destroy({
      where:{
        id:id
      }
    })
    if(!student){
      res.status(404).send("Student not found")   
    }
    res.status(200).send("user has deleted");
  }catch(err){
    console.log(err)
    res.status(500).send("Unable to delete the entry in the database");
  }
  // const delQuery = "DELETE FROM students WHERE id = ?";

  // db.execute(delQuery, [id], (err, result) => {
  //   if(err){
  //     console.log(err.message);
  //     res.status(500).send(err.message);
  //     db.end();
  //     return;
  //   }

  //   if(result.affectedRows === 0){
  //     res.status(404).send("Student not found");
  //     return;
  //   }
  //   res.status(200).send("Student has been deleted successfully");
  // })
}
module.exports = { 
  addEntries,
  updatEntry,
  deleteEntry,
 };