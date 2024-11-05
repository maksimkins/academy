const Group = require('../models/Group');
const Homework = require('../models/Homework');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/homework');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); 
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/zip' || file.mimetype === 'application/x-zip-compressed') {
        cb(null, true);
    } else {
        cb(new Error('Only .zip files are allowed!'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // Limit file size to 5MB
});

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

const uploadHW = async (req, res) => {
    try {
        const { pupilId, homeworkId } = req.body;

        const homework = await Homework.findByPk(homeworkId);
        if (!homework) {
            return res.status(404).json({ error: "Homework not found" });
        }

        const filePath = req.file.path; 
       

        res.status(200).json({ message: 'File uploaded successfully', filePath });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = {
    createHomework,
    upload,
    uploadHW,
};


