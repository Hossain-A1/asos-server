const express = require("express");
const cors = require("cors");
require("dotenv").config();
// app
const app = express();

// middleware
app.use(express.json());
app.use(cors({ credentials: true }));
app.use("/", (req, res, next) => {
  console.log(req.method, req.path);
  next();
});
// port
const port = process.env.PORT || 8080;
const uri = process.env.MONGO_URI;

app.get("/", (req, res) => {
  return res.status(200).json({ message: "hello next" });
});



  app.listen(port, () => {
    console.log(`app listen on port ${port}`);
  });
