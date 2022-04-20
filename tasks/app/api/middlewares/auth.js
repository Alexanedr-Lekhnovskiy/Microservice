const jwt  = require('jsonwebtoken');
const { APP_SECRET } = require('../../config');

module.exports.UserAuth = async (req, res, next) => {   
    const isAuthorized = this.ValidateSignature(req);
    if(isAuthorized) {
        return next();
    }
    return res.json({message: 'Not Authorized'});
}

module.exports.ValidateSignature = (req) => {
    let token = req.headers.authorization;
    if (!token) {
        return false;
    }    
    try {
        token = token.split(' ')[1];
        const verifiedUser = jwt.verify(token, APP_SECRET);   
        if (!verifiedUser) {
            return  false;
        }    
        req.user = verifiedUser; 
        return true;
    } catch (error) {
        return  false;
    }
};