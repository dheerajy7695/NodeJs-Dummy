require('dotenv').config();
const JWT = require('jsonwebtoken');

module.exports = {

    signAccessToken: (userId) => {
        return new Promise((resolve, reject) => {

            const payload = {};
            const secret = process.env.ACCESS_TOKEN_SECRET;
            const option = {
                expiresIn: "2h",
                issuer: "Dheeraj",
                audience: userId
            }

            JWT.sign(payload, secret, option, (err, token) => {
                if (err) reject(err);
                resolve(token);
            })
        })
    },

    // signRefreshToken: (userId) => {
    //     return new Promise((resolve, reject) => {

    //         const payload = {};
    //         const secret = process.env.REFRESH_TOKEN_SECRET;
    //         const option = {
    //             expiresIn: "1d",
    //             issuer: "Dheera.kumar",
    //             audience: userId
    //         }

    //         JWT.sign(payload, secret, option, (err, token) => {
    //             if (err) reject(err);
    //             resolve(token);
    //         })
    //     })
    // }
};
