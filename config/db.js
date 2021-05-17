const mongoose = require("mongoose");

const connection = async() => {
    await mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser:true,
        useCreateIndex:true,
        useUnifiedTopology:true,
        useFindAndModify:true
    });
    console.log("Monodb connected");
};

module.exports = connection;