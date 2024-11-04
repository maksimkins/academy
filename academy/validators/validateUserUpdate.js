const validateUserUpdate = (req, res, next) => {
    const { name, surname, email, about } = req.body;

    if (!name && !surname && !email && !about) {
        return res.status(400).json({
            errors: [
                { msg: 'All fields (name, surname, email, about) are required and cannot be null.' }
            ]
        });
    }

    next();
};

module.exports = validateUserUpdate;