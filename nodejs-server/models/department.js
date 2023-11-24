const { DataTypes } = require('sequelize');
const jwt = require('jsonwebtoken');

const { sequelize } = require('../utils/database');

const Department = sequelize.define('department',{
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
    d_code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    d_name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    head: {
        type: DataTypes.INTEGER
    }
});

module.exports = Department;