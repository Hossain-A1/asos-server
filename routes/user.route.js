const express = require("express");
const {
  signupUser,
  loginUser,
  getAllUser,
} = require("../controllers/user.controller");
const { authUsers } = require("../middlewares/auth.middleware");
const { isAdmin } = require("../middlewares/admin.middleware");

const router = express.Router();

router.post("/auth/signup", signupUser);
router.post("/auth/login", loginUser);
router.get("/", authUsers, isAdmin, getAllUser);

module.exports = router;
