const UserModel = require('../models/User');

module.exports = ({
    async register(req, res) {
        const { email } = req.body;

        try {

            if (UserModel.findOne({email}))
                return res.status(400).json({ error: 'Email already in use' });

            const user = UserModel.create(req.body);

            user.password = undefined;

            return res.json(user);

        } catch(err) {
            return res.status(400).json({ error: 'Registration failed' });
        }
    },
});