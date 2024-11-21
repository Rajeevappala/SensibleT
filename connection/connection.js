const mongoose = require("mongoose");
const connect = async(req , res) => {
    try {
        await mongoose.connect("mongodb+srv://rajeevappala055:rajeevappala055@cluster0.7t2lo.mongodb.net/")
        console.log("Connected to database")
    } catch (error) {
        console.error(error)
    }
    
};


connect();