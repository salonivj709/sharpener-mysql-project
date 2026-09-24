const { DataTypes } = require("sequelize");
const db = require("../utils/db-connection");

const Booking = db.define("Booking", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    bus_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    seats_booked: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: "bookings",
    timestamps: false
});

module.exports = Booking;