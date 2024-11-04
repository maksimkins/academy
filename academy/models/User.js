const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { v4: uuidv4 } = require('uuid');

const Role = require("./Role");

const User = sequelize.define('User', {

    id: {
        type: DataTypes.UUID,       
        defaultValue: uuidv4,
        primaryKey: true,
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    surname: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    about: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    roleId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Roles',
          key: 'id',
        },
    },
});

Role.hasMany(User, {
    foreignKey: 'roleId',
    as: 'users'
});

User.belongsTo(Role, {
    foreignKey: 'roleId',
    as: 'role'
});

module.exports = User;