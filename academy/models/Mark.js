const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { v4: uuidv4 } = require('uuid');

const User = require("./User");
const Homework = require("./Homework");

const Mark = sequelize.define('Mark', {
    id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4,
        primaryKey: true,
    },
    studentId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },

    teacherId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },


    homeworkId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Homework,
            key: 'id'
        }
    },
    mark: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
            max: 12
        }
    },
}, {
    timestamps: true, 
});

User.hasMany(Mark, {
    foreignKey: 'studentId',
    as: 'marks'
});

Mark.belongsTo(User, {
    foreignKey: 'studentId',
    as: 'student'
});


Mark.belongsTo(User, {
    foreignKey: 'teacherId',
    as: 'teacher'
});

Homework.hasMany(Mark, {
    foreignKey: 'homeworkId',
    as: 'marks'
});

Mark.belongsTo(Homework, {
    foreignKey: 'homeworkId',
    as: 'homework'
});

module.exports = Mark;
