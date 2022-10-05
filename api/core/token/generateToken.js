const JWT = require('jsonwebtoken');


module.exports = {

    signAccessToken: (userId) => {
        return new Promise((resolve, reject) => {

            const payload = {};
            const secret = "Dheeraj$%#@#";
            const option = {
                expiresIn: "1h",
                issuer: "Dheera.kumar",
                audience: userId
            }

            JWT.sign(payload, secret, option, (err, token) => {
                if (err) reject(err);
                resolve(token);
            })
        })
    }
};
