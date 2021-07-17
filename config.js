require("dotenv").config();
var mongoose = require("mongoose");



//Connecting with mongoDB Database
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
mongoose.connection
    .once('open', () => console.log("Well done! , connected with mongoDB database"))
    .on('error', error => console.log("Opps! database connection error:" + error));

    module.exports = {
        mongoose
    }
