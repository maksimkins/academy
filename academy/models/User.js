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
        validate: {
            len: {
                args: [8, 16],
                message: "Password must be between 8 and 50 characters long",
            },
            isValidPassword(value) {
                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                if (!passwordRegex.test(value)) {
                    throw new Error("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
                }
            }
        },
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