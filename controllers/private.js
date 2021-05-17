const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.getPrivatedata = (req, res, next) => {
    res.status(200).json({
        success: true,
        data: "You got access to the private data in this router"
        
    });
};

exports.updatedatabase = async (req, res, next) => {
    let token = req.params.token;
    const { oxygen, syringes, otherRequiredItems } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_CODE);
        const user= await (await User.findById(decoded.id));
        // await User.findOneAndUpdate({_id:decoded.id},{oxygen:oxygen});
        if (oxygen !== null&& oxygen>0) {
            let oxy = Number(user.oxygen) + Number(oxygen);
            await User.updateOne({ _id:decoded.id }, { $set: { oxygen: oxy } })
        }
        if (syringes !== null&& syringes>0) {
            let syr = Number(user.syringes) + Number(syringes);
            await User.updateOne({ _id: decoded.id }, { $set: { syringes: syr } })
        }
        if (otherRequiredItems !== null&& otherRequiredItems>0) {
            let oth = Number(user.otherRequiredItems) + Number(otherRequiredItems);
            await User.updateOne({ _id: decoded.id }, { $set: { otherRequiredItems: oth } })
        }
        const user1= await (await User.findById(decoded.id));
        res.status(201).json({
            status: true,
            user1
        })
    } catch (error) {
        res.json({
            status: false,
            error:error.message
        })
    }

};



exports.previousdonation = async (req, res, next) => {
    let token = req.params.token;
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_CODE);
        const user= await (await User.findById(decoded.id));
        res.status(201).json({
            user
        })
        // const user = await (await User.findById(req.params.id));
        // res.status(201).json({
        //     status: true,
        //     user
        // })
    } catch (error) {
        res.json({
            status: false,
            error:error.message
        })
    }
}