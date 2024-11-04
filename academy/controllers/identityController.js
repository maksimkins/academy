const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'HShah546!ldm++'; 

const User = require('../models/User'); 
const Role = require('../models/Role');

const register =  async (req, res) => {
    const { name, surname, email, password } = req.body;

    try {
        console.log(email)
        const existingUser = await User.findOne({ where: {email} });
        if (existingUser) return res.status(400).json({ message: `User with email:${email} already exists` });

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const defaultRole = await Role.findOne({ where: {name: 'User'} });

        const newUser = new User({
            name,
            surname,
            email,
            password: hashedPassword,
            roleId: defaultRole.id,
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } 
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({
            where: { email },
            include: {
                model: Role,
                as: 'role',       
                attributes: ['name'],  
            },
        });
        if (!user) return res.status(400).json({ message: 'User does not exist' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id, name: user.name, surname: user.surname, email:user.email, role: user.role.name}, 
            JWT_SECRET, 
            { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    register,
    login,
};