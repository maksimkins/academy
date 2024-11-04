const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { v4: uuidv4 } = require('uuid');

const User = require("./User");
const Group = require("./Group");

const UserGroup = sequelize.define('UserGroup', {
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
}, {
    indexes: [
        {
            unique: true,
            fields: ['userId', 'groupId']
        }
    ]
});


User.belongsToMany(Group, { through: UserGroup, foreignKey: 'userId', as: 'groups' });
Group.belongsToMany(User, { through: UserGroup, foreignKey: 'groupId', as: 'users' });

module.exports = UserGroup;