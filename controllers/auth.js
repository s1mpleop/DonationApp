const User = require('../models/User');


exports.register = async (req, res, next) =>{
    const {username,email,password} = req.body;

    try {
        const user = await User.create({
            username,email,password
        });

        sendToken(user,201,res);
    } catch (error) {
        res.status(500).json({
            success:false,
            error: error.message
        });
    }


};



exports.login = async(req, res, next) =>{
    const {email, password} = req.body;

    if(!email || !password){
        res.status(400).json({success: false , error: "PLease provide email and password"})
    }
    try {
        const user = await (await User.findOne({email}).select("+password"));

        if(!user){
            res.status(404).json({success: false, error: " Invalid details"})
        }

        const isMatch = await user.matchPasswords(password);
        if(!isMatch){
            res.status(404).json({success:false, error: " Invalid details"});
        }
        sendToken(user,200,res);

    } catch (error) {
        res.status(500).json({
            success:false,
            error: error.message
        });
    }
};




const sendToken = (user,statusCode,res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({success: true , token:token});
}

