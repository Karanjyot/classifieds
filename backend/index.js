const express = require("express");

const app = express();

var PORT = 5000 || process.env.PORT;

//middleware to handle JSON/URLencoded data. Parse JSON (turn json into js object)

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/hello", (req,res)=>{
    res.send("hello worlds")
})

app.listen(PORT, ()=>(
    console.log(`server is running on port ${PORT}`)
))