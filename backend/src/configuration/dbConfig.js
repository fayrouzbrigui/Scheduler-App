const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/scheduler");

mongoose.connection.on("connected", () => {
    console.log("connected to mongodb");
});

mongoose.connection.on("error", (error) => {
    console.log(`mongodb connection error ${error}`);
});

module.exports = mongoose;