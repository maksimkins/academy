const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { v4: uuidv4 } = require('uuid');

const User = require("./User");
const Group = require("./Group");

const Message = sequelize.define('Message', {

    id: {
        type: DataTypes.UUID,       
        defaultValue: uuidv4,
        primaryKey: true,
    },

    userId: {
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

    text: {
        type: DataTypes.STRING,
        allowNull: false,
    },

});

User.hasMany(Message, {
    foreignKey: 'userId',
    as: 'messages'
});

Message.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
});

Group.hasMany(Message, {
    foreignKey: 'groupId',
    as: 'messages'
});

Message.belongsTo(Group, {
    foreignKey: 'groupId',
    as: 'group'
});

module.exports = Message;