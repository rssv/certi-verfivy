const { DataTypes } = require('sequelize');

const { sequelize } = require('../utils/database');

const StudentSubjectRegistration = sequelize.define('studentSubjectRegistration',{
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
    marks: DataTypes.INTEGER,
    status: DataTypes.STRING,
    studentId: {
        type: DataTypes.INTEGER
    },
    subOfferingId: {
        type: DataTypes.INTEGER
    }
});

module.exports = StudentSubjectRegistration; 