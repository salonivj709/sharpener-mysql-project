const { DataTypes } = require("sequelize");
const db = require("../utils/db-connection");

const Bus = db.define("Bus", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    bus_name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    bus_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    available_seats: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: "buses",
    timestamps: false
});

module.exports = Bus;