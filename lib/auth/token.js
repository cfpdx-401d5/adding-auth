const jwt = require('jsonwebtoken-promisified');

const sekurate = process.env.APP_SECRET || 'renew me';

module.exports = {
    sign(user) {
        const payload = {
            id: user._id,
            roles: user.roles
        };

        return jwt.signAsync(payload, sekurate);
    },
    verify(token) {
        return jwt.verifyAsync(token, sekurate);
    }
};