const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

//set up express

const app = express();

//middleware to handle JSON/URLencoded data. Parse JSON (turn json into js object)

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

//set up routes as middleware

app.use("/users", require("./routes/userRouter"))

//set up mongoose

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/classifieddb",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to DB");
  }
);

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
