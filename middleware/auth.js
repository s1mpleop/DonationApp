const jwt = require('jsonwebtoken');
const User = require('../models/User');
const user = require('../models/User');

exports.protect = async (req,res,next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        // Bearer 13124bk4bjhwi
        token = req.headers.authorization.split(" ")[1]
    }

    if(!token){
        res.status(401).json({
            success: false,
            data:"Not authorized to access this route"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_CODE);
        const user = await User.findById(decoded.id);

        if(!user){
            res.status(404).json({
                success: false,
                data:"No user found with this id"
            });
        }
        req.user = user;

        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            data:"Not authorized to access this route"
        });
    }
}

