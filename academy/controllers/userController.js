const path = require('path');
const fs = require('fs');

const User = require('../models/User')


function getFileExtension(mimeType) {
    const mimeToExt = {
        'image/jpeg': 'jpg',
        'image/png': 'png',
        'image/gif': 'gif',
        'image/bmp': 'bmp',
        'image/webp': 'webp',
    };
    return mimeToExt[mimeType] || null;
}

const setAvatar = async (req, res) => {
    try{
        const userId = req.user.id;
        const contentType = req.headers['content-type'];
    
        if (!contentType || !contentType.startsWith('multipart/form-data')) {
            return res.status(400).json({ message: 'Invalid content-type. Expected multipart/form-data.' });
        }
    
        const boundary = '--' + contentType.split('boundary=')[1];
        let imageData = Buffer.alloc(0);
    
        req.on('data', (chunk) => {
            imageData = Buffer.concat([imageData, chunk]);
        });
    
        req.on('end', () => {
        
            const dataString = imageData.toString();
            const parts = dataString.split(boundary);
    
            const filePart = parts.find(part => part.includes('Content-Type: image'));
    
            if (!filePart) {
                return res.status(400).json({ message: 'No image file found in the request' });
            }
    
            const mimeTypeMatch = filePart.match(/Content-Type: (image\/[a-z]+)/);
            if (!mimeTypeMatch) {
                return res.status(400).json({ message: 'Unsupported image format.' });
            }
    
            const mimeType = mimeTypeMatch[1];
            const extension = getFileExtension(mimeType);
    
            if (!extension) {
                return res.status(400).json({ message: 'Unsupported image format.' });
            }
    
            const startOfFile = filePart.indexOf('\r\n\r\n') + 4;
            const endOfFile = filePart.lastIndexOf('\r\n');
            const fileData = imageData.slice(startOfFile, endOfFile);
    
            const avatarPath = path.join(__dirname, '../avatars', `${userId}.${extension}`);
            fs.writeFile(avatarPath, fileData, (err) => {
                if (err) {
                    console.error('Error saving avatar:', err);
                    return res.status(500).json({ message: 'Error saving avatar' });
                }
                res.status(200).json({ message: 'Avatar uploaded successfully.', filename: `${userId}.${extension}` });
            });
        });
    }catch(err){
        return res.status(500).json(err );
    }
};


const getAvatar = async (req, res) => {
    try{
        const userId = req.user.id;
        const avatarsDir = path.join(__dirname, '../avatars');

        fs.readdir(avatarsDir, (err, files) => {
            if (err) {
                console.error('Error reading avatars directory:', err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }

            const avatarFile = files.find(file => file.startsWith(userId + '.'));

            if (avatarFile) {
                res.sendFile(path.join(avatarsDir, avatarFile));
            } else {
                res.sendFile(path.join(__dirname, '../avatars/defaultImage.jpg'));
            }
        });
    }catch(err)
    {
        return res.status(500).json(err);
    }
};


const about = async (req, res) => {
    const userId = req.user.id;

    const user = await User.findByPk(userId);
    if(!user)
    {
        res.status(404).json({ error: 'could not find user' });
    }

    res.json(
    {
        aboutInfo: user.about,
        ...req.user
    })
}

const update = async (req, res) => {
    try{

        const userId = req.user.id;
        const { name, surname, email, about} = req.body;
        
        const user = await User.findByPk(userId);
        if (user) {

          user.name = name || user.name;
          user.surname = surname || user.surname;
          user.email = email || user.email;
          user.about = about || user.about;

          await user.save();
          res.status(200).json({message: 'user successfully changed!'});

        }else {
            res.status(404).json({ error: 'could not find user' });
          }
    }catch(err)
    {
        return res.status(500).json(err);
    }
}


module.exports = {
    about,
    getAvatar,
    setAvatar,
    update,
};