const { get } = require("../caches");
const { BadError, UnauthornizedError } = require("../errors/base");
const { verifyToken } = require("../jwts");

function isLogin(req, res, next) {
    const tokenParts = req.get('Authorization')?.split(" ");
    if(!tokenParts) {
        next(new UnauthornizedError('No token found'));
    }
    if(tokenParts[0] !== 'Bearer') {
        next(new BadError('Require bearer token'));
    }
    const user = verifyToken(tokenParts[1]);
    if(!user) {
        next(new BadError('Wrong token'));
    }
    console.log(user.iat * 1000, Number(get(`user:${user.user}`)));
    if(user.iat * 1000 < Number(get(`user:${user.user}`))) {
        next(new BadError('Token was revoked'));
    }
    req.user = user.user;
    next();
}   

module.exports = {
    isLogin
}