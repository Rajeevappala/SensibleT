const router = require("express").Router(); 

const Transaction = require("../models/transaction");
const user = require("../models/user");

// Post Transaction

router.post("/" , async(req , res) => {
    try {
        const{amount , transaction_type , status , _id} = req.body;
    const existingUser = await user.findById({_id});

    if(existingUser){
        const transaction = new Transaction({amount , transaction_type , status , user : existingUser});
        await transaction.save().then(() => {
            res.status(200).json({transaction})
            console.log("Transaction Added Succussfully")
        })
        existingUser.list.push(transaction);
        existingUser.save()
    }
    } catch (error) {
        console.error(error.message)
        res.status(400).json({message : error.message})
    }
})



// Get All Transactions of a perticular user 

router.get("/" , async(req , res) => {
    try {
        const {id} = req.query
        //console.log(id)
        const transactions = await Transaction.find({user : id});
        res.status(200).json({transactions})
        console.log(transactions);
    } catch (error) {
        console.error(error.message)
        res.status(400).json({message : error.message})
    }
})


// Update Transaction 

router.put("/:id" , async(req , res) => {
    console.log("hello")
    try {
    const {id} = req.params;
    console.log(id)
    const{amount , transaction_type , status } = req.body;
    const existingUser = await Transaction.findById(id);

    if(existingUser){
        const transaction = await Transaction.findByIdAndUpdate(id , {amount , transaction_type, status} , {new : true});
        await transaction.save().then(() => {
            res.status(200).json({transaction})
            console.log("Transaction Updated Successfully")
        })
    }
    } catch (error) {
        console.error(error.message)
        res.status(400).json({message : error.message})
    }
})

//Delete Task 

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params; 
        console.log(id);

    
        const deletedTransaction = await Transaction.findByIdAndDelete(id);

        if (!deletedTransaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }

       
        res.status(200).json({ message: "Transaction Deleted" });
        console.log("Transaction Deleted Successfully");
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ message: error.message }); // Handle errors
    }
});




// get specific transaction 

router.get("/:id" , async(req , res) => {
    try {
        const {id} = req.params;
        const transaction = await Transaction.findById(id);
        if (!transaction){
            res.status(400).json({message : "Transaction Not Found"})
        }
        res.status(400).json({transaction});
    } catch (error) {
        console.error(error.message)
        res.status(400).json({message : error.message})
        
    }
})



module.exports = router;