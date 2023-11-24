const { DataTypes } = require('sequelize');
const jwt = require('jsonwebtoken');

const { sequelize } = require('../utils/database');

const SubOfferingForDept = sequelize.define('subOfferingForDept',{
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
    departmentId:{
        type: DataTypes.INTEGER
    },
    subOfferingId: {
        type: DataTypes.INTEGER
    },
    courseId: {
        type: DataTypes.INTEGER
    }
});

module.exports = SubOfferingForDept;