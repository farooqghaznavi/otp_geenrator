const Sequelize = require("sequelize");
const db = require("../config/dbConfig");

const User = db.define("user", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  otp: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  otp_expiration_date: {
    type: Sequelize.DATE,
    allowNull: true
  },
  phone_number: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
});

module.exports = User;
