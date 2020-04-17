const UserModel = require('../models/User');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken')

module.exports = ({
    async register(req, res) {
        const { email } = req.body;

        try {

            if (UserModel.findOne({email}))
                return res.status(400).json({ error: 'Email already in use' });

            const user = UserModel.create(req.body);

            user.password = undefined;

            return res.json({ 
                user, 
                token: generateToken(user.id),
            });

        } catch(err) {
            return res.status(400).json({ error: 'Registration failed' });
        }
    },

    async authenticate(req, res) {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email }).select('+password');

        if (!user)
            return res.status(400).json({ error: 'User does not exist' });

        if(!await bcrypt.compare(password, user.password))
            return res.status(400).json({ error: 'Invalid password' })

        user.password = undefined;

        return res.json({ 
            user, 
            token: generateToken(user.id),
         })
        
    }
});