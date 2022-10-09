const JWT = require('jsonwebtoken');

module.exports = isUserAuthenticated = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) return res.status(403).json({ status: "403", message: "This field is required : authorization" });

    const token = authHeader && authHeader.split(' ')[1];
    const checkBearer = authHeader.includes("Bearer");

    if (!checkBearer) return res.status(401).json({ status: "401", message: "Bearer keyword is missing from the token" });

    if (token == null) return res.status(403).json({ status: "403", message: "missing token in header" });

    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ status: '403', message: 'UNAUTHORIZED USER' });
        next();
    })
};