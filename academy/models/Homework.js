const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { v4: uuidv4 } = require('uuid');

const User = require("./User");
const Group = require('./Group');

const Homework = sequelize.define('Homework', {

    id: {
        type: DataTypes.UUID,       
        defaultValue: uuidv4,
        primaryKey: true,
    },

    teacherId: {
        type: DataTypes.UUID,
        references: {
            model: User,
            key: 'id'
        }
    },

    groupId: {
        type: DataTypes.UUID,
        references: {
            model: Group,
            key: 'id'
        }
    },

    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    deadline: {
        type: DataTypes.DATE,
        allowNull: false,
    },

});

User.hasMany(Homework, {
    foreignKey: 'teacherId',
    as: 'homeworks'
});

Homework.belongsTo(User, {
    foreignKey: 'teacherId',
    as: 'user'
});

Group.hasMany(Homework, {
    foreignKey: 'groupId',
    as: 'homeworks'
});

Homework.belongsTo(Group, {
    foreignKey: 'groupId',
    as: 'group'
});



module.exports = Homework;