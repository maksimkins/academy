const User = require('../models/User'); 
const Group = require('../models/Group');
const UserGroup = require('../models/UserGroup');

const createGroup = async (req, res) => {
    try
    {
        const name = req.body.name;

        if(!name)
        {
            res.status(400).json({ message: `Group name can not be null` });
        }

        const existingGroup = await Group.findOne({ where: {name} });
        if(existingGroup)res.status(400).json({ message: `Group with name:${name} already exists` });

        const newGroup = new Group({
            name,
        });
    
        await newGroup.save();
        res.status(201).json({ message: `Group:${name} created successfully` });
    }
    catch(err)
    {
        res.status(500).json(err);
    }
}

const deleteGroup = async (req, res) => {
    try
    {
        const name = req.body.name;

        if(!name)
        {
            res.status(400).json({ message: `Group name can not be null` });
        }

        await Group.destroy({
            where: {
                name: name,
            }
        });
        res.status(200).json({ message: `Group:${name} deleted successfully` });
    }
    catch(err)
    {
        res.status(500).json(err);
    }
}

const addToGroup = async (req, res) => {
    try
    {
        const {userId, groupId} = req.body;

        if(!userId || !groupId)
        {
            res.status(400).json({ message: `userId or groupId can not be null` });
        }

        const existingGroup = await Group.findOne({ where: {id: groupId} });
        if(!existingGroup)res.status(400).json({ message: `Group with id:${groupId} does not exist` });

        const existingUser = await User.findOne({ where: {id: userId} });
        if(!existingUser)res.status(400).json({ message: `User with id:${userId} does not exist` });

        const newGroup = new UserGroup({
            userId,
            groupId,
        });
    
        await newGroup.save();
        res.status(201).json({ message: `User with id:${userId} successfully added to the group with id:${groupId}` });
    }
    catch(err)
    {
        res.status(500).json(err);
    }
}

const deleteFromGroup = async (req, res) => {
    try
    {
        const {userId, groupId} = req.body;

        if(!userId || !groupId)
        {
            res.status(400).json({ message: `userId or groupId can not be null` });
        }

        const existingGroup = await Group.findOne({ where: {id: groupId} });
        if(!existingGroup)res.status(400).json({ message: `Group with id:${groupId} does not exist` });

        const existingUser = await User.findOne({ where: {id: userId} });
        if(!existingUser)res.status(400).json({ message: `User with id:${userId} does not exist` });

        await UserGroup.destroy({
            where: {
                groupId: groupId,
                userId: userId
            }
        });

        res.status(200).json({ message: `User with id:${userId} successfully deleted from group with id:${groupId}` });
    }
    catch(err)
    {
        res.status(500).json(err);
    }
}


module.exports = {
    createGroup,
    addToGroup,
    deleteFromGroup,
    deleteGroup,
};
