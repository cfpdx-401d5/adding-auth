const jwt = require('jsonwebtoken-promisified');
const sekrit = process.env.APP_SECRET || 'i-love-sushi';

module.exports = {
    sign(user) {
        const payload = {
            id: user._id,
        };
        return jwt.signAsync(payload, sekrit);
    },
    verify(token) {
        return jwt.verifyAsync(token, sekrit);
    }
};