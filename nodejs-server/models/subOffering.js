const { DataTypes } = require('sequelize');
const jwt = require('jsonwebtoken');

const { sequelize } = require('../utils/database');

const SubOffering = sequelize.define('subOffering',{
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
    subjectId: {
        type: DataTypes.INTEGER
    },
    semesterId: {
        type: DataTypes.INTEGER
    },
    instructorId: {
        type: DataTypes.INTEGER
    }
});

module.exports = SubOffering; 