const {Sequelize, DataTypes} = require('sequelize')
const sequelize = require('../utils/db-connection')

const studentCourses = sequelize.define('studentCourses',{
  id:{
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true
  }
});
module.exports = studentCourses;