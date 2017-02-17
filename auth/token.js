const jwt = require('jsonwebtoken-promisified');
const sekret = process.env.APP_SECRET || 'change-me';

module.exports = {
    sign(user) {
        const payload = {
            id: user._id,
            roles: user.roles
        };

        return jwt.signAsync(payload, sekret);
    },
    verify(token) {
        return jwt.verifyAsync(token, sekret);
    }
};