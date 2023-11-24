const { DataTypes } = require('sequelize');
const jwt = require('jsonwebtoken');

const { sequelize } = require('../utils/database');

const Instructor = sequelize.define('instructor',{
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
    cv_link:{
        type: DataTypes.TEXT,
    },
    departmentId: {
        type: DataTypes.INTEGER
    },
    employeeId: {
        type: DataTypes.INTEGER
    }
});

module.exports = Instructor;