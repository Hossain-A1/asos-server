const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose")
const userRoute = require("./routes/user.route")
// app
const app = express();

//variables
const port = process.env.PORT || 5000;
const uri = process.env.MONGO_URI;
// middleware
app.use(express.json());
app.use(cors({ credentials: true }));
app.use("/", (req, res, next) => {
  console.log(req.method, req.path);
  next();
});


app.get("/", (req, res) => {
  return res.status(200).json({ message: "hello next" });
});

app.use("/api/users",userRoute)

mongoose.connect(uri,{useUnifiedTopology:true}).then(()=>{
  app.listen(port, () => {
    console.log(`app listen on port ${port}`);
  });

}).catch((error)=>{
  console.log(error.message);
})

 