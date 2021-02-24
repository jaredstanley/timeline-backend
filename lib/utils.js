const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { getUserByEmail } = require("../lib/db");

async function signToken(user) {
    const secret = Buffer.from(process.env.JWT_SECRET, "base64");

    return jwt.sign(user, secret, {
        expiresIn: 86400 // expires in 24 hours
    });
}

async function getUserFromToken(token) {
    const secret = Buffer.from(process.env.JWT_SECRET, "base64");

    const decoded = jwt.verify(token.replace("Bearer ", ""), secret);

    return decoded;
}

async function login(args) {
    try {
        var user = await getUserByEmail(args.email);
        user = user.dataValues
        console.log(user)
        const isValidPassword = await comparePassword(
            args.password,
            user.passwordHash
        );
        if (isValidPassword) {
            delete user.passwordHash
            const token = await signToken(user);
            return Promise.resolve({ token: token });
        }
    } catch (err) {
        console.info("Error login", err);
        return Promise.reject(new Error(err));
    }
}

function comparePassword(eventPassword, userPassword) {
    return bcrypt.compare(eventPassword, userPassword);
}

async function decodeToken(token) {
    const secret = Buffer.from(process.env.JWT_SECRET, "base64");

    const decoded = jwt.verify(token.replace("Bearer ", ""), secret);

    return decoded;
}

module.exports = {
    signToken,
    decodeToken,
    getUserFromToken,
    login
};