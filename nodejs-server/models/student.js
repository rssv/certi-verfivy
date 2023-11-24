const { DataTypes } = require('sequelize');
const jwt = require('jsonwebtoken');

const { sequelize } = require('../utils/database');

const Student = sequelize.define('student',{
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
    adm_no: {
        type: DataTypes.STRING,
        allowNull: false
    },
    s_name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    year_of_adm: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false
    },
    current_sem:{
        type: DataTypes.INTEGER
    },
    major1: {
        type: DataTypes.STRING
    },
    major2: {
        type: DataTypes.STRING
    },
    departmentId: {
        type: DataTypes.INTEGER
    },
    courseId: {
        type: DataTypes.INTEGER
    }

});

module.exports = Student;