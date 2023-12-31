const { DataTypes } = require('sequelize');
const jwt = require('jsonwebtoken');

const { sequelize } = require('../utils/database');

const Semester = sequelize.define('semester',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    sem_session:{
        type: DataTypes.STRING,
        allowNull: false
    },
    sem_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sem_no: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Semester;