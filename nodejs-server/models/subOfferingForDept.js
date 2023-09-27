const { DataTypes } = require('sequelize');
const jwt = require('jsonwebtoken');

const { sequelize } = require('../utils/database');

const SubOfferingForDept = sequelize.define('subOfferingForDept',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    departmentId:{
        type: DataTypes.INTEGER,
        get() {
            let value = this.getDataValue('departmentId');
            if(value){
                const stringId = jwt.sign({id: value}, process.env.INT_TO_STRING_SECRET);
                const stringIdParts = stringId.split('.');
                return stringIdParts[1] + '.' + stringIdParts[2];
            }
            else return value;
        },

        set(value) {
            const intId = jwt.verify( process.env.JWT_ALGORITHM_CONST + '.' + value, process.env.INT_TO_STRING_SECRET);
            this.setDataValue('departmentId', intId.id);
        }
    },
    subOfferingId: {
        type: DataTypes.INTEGER,
        get() {
            let value = this.getDataValue('subOfferingId');
            if(value){
                const stringId = jwt.sign({id: value}, process.env.INT_TO_STRING_SECRET);
                const stringIdParts = stringId.split('.');
                return stringIdParts[1] + '.' + stringIdParts[2];
            }
            else return value;
        },

        set(value) {
            const intId = jwt.verify( process.env.JWT_ALGORITHM_CONST + '.' + value, process.env.INT_TO_STRING_SECRET);
            this.setDataValue('subOfferingId', intId.id);
        }
    },
    courseId: {
        type: DataTypes.INTEGER,
        get() {
            let value = this.getDataValue('courseId');
            if(value){
                const stringId = jwt.sign({id: value}, process.env.INT_TO_STRING_SECRET);
                const stringIdParts = stringId.split('.');
                return stringIdParts[1] + '.' + stringIdParts[2];
            }
            else return value;
        },

        set(value) {
            const intId = jwt.verify( process.env.JWT_ALGORITHM_CONST + '.' + value, process.env.INT_TO_STRING_SECRET);
            this.setDataValue('courseId', intId.id);
        }
    }
});

module.exports = SubOfferingForDept;