const jwt = require('jsonwebtoken');

const { DataTypes } = require('sequelize');

const { sequelize } = require('../utils/database');

const Subject = sequelize.define('subject', {
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
    sub_code:{
        type: DataTypes.STRING,
        allowNull: false
    },
    sub_name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    departmentId: {
        type: DataTypes.INTEGER
    }
});

module.exports = Subject;