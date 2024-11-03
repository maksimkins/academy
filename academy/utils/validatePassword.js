const validatePassword = (req, res, next) => {
    const { password } = req.body;

    // Check if password is provided
    if (!password) {
        return res.status(400).json({ error: 'Password is required.' });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const minLength = 8;
    const maxLength = 16;

    if (password.length < minLength || password.length > maxLength) {
        return res.status(400).json({ 
            error: `Password must be between ${minLength} and ${maxLength} characters long.` 
        });
    }

    if (!passwordRegex.test(password)) {
        return res.status(400).json({ 
            error: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.' 
        });
    }

    next();
};

module.exports = validatePassword;