const express = require("express")
require("./connection/connection")
const app = express()
const user = require("./routes/user");
const transaction = require("./routes/transaction")

const PORT = process.env.PORT || 3000

app.listen(PORT, () =>{
    console.log(`Server started at port ${PORT}`)
})

app.use(express.json());

app.use("/api" , user)
app.use("/api/transactions" , transaction);

app.get("/", (req , res) => {
    res.send("Hello")
})

