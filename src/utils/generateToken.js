const authConfig = require('../config/auth.json');
const jwt = require('jsonwebtoken');

const token = (user_id) => {
    return jwt.sign({ id: user_id }, authConfig.secret, {
        expiresIn: 86400, //sec | 1day
    });
}

module.exports = token;
