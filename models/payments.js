const { DataTypes } = require("sequelize");
const db = require("../utils/db-connection");

const Payment = db.define("Payment", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    booking_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },

    payment_method: {
        type: DataTypes.STRING,
        allowNull: false
    },

    payment_status: {
        type: DataTypes.STRING,
        defaultValue: "Pending"
    }
}, {
    tableName: "payments",
    timestamps: false
});

module.exports = Payment;