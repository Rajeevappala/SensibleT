const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    amount: {
         type: Number,
          required: true 
        },
    transaction_type: {
            type: String,
            enum: ['DEPOSIT', 'WITHDRAWAL'],
            required: true 
        },
    status:{
        type: String,
        enum : ["PENDING" ,"COMPLETED", "FAILED"],
        default : "PENDING"
    },
    timestamp : {
        type : Date,
        default : Date.now
    },
    user : [
        {
            type : mongoose.Types.ObjectId,
            ref : "User",
        }
    ]
})


module.exports = mongoose.model("Transaction" , transactionSchema);
