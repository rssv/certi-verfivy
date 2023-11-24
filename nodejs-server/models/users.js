const { DataTypes, Sequelize } = require('sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { sequelize } = require('../utils/database');

const User = sequelize.define('user',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    user_name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    passcode: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    user_role: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    refresh_token: DataTypes.TEXT,
    employeeId: {
        type: DataTypes.INTEGER
    },
    studentId: {
        type: DataTypes.INTEGER
    }
});

module.exports = User;