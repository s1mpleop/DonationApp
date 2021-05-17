const express = require("express");
const dotenv = require('dotenv');
const connectDB = require('./config/db');


dotenv.config();

connectDB();
const app = express();

app.use(express.json());
app.use("/api/auth",require('./routes/auth'));
app.use("/api/private",require('./routes/private'));

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT ,() => console.log(`Server up and running on port ${PORT}!!`));

process.on("unhandledRejection",(err, promise) => {
    console.log(`Logged error: ${err}`);
    server.close(() => process.exit(1));
})