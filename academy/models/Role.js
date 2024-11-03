const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { v4: uuidv4 } = require('uuid');

const Role = sequelize.define('Role', {

    id: {
        type: DataTypes.UUID,       
        defaultValue: uuidv4,
        primaryKey: true,
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },

});

module.exports = Role;