
const Group = require('../models/Group');
const Homework = require('../models/Homework');

const createHomework = async (req, res) => {
    try
    {
        
        const teacherId = req.user.id;
        const {groupId, description, deadline} = req.body;

        console.log({groupId, description, deadline, teacherId})

        if(!teacherId || !groupId || !description || !deadline)
        {
            res.status(400).json({ message: `hw can not be created due to some params are null` });
        }

        const existingGroup = await Group.findOne({ where: {id: groupId} });
        if(!existingGroup)res.status(400).json({ message: `Group with id:${groupId} does not exists` });

        const newHw = new Homework({
            teacherId: teacherId,
            groupId: groupId,
            description: description,
            deadline: deadline,
        });
    
        await newHw.save();
        res.status(201).json({ message: `hw created successfully` });
    }
    catch(err)
    {
        res.status(500).json(err);
    }
}



module.exports = {
    createHomework,
};


