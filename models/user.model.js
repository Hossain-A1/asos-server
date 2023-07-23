const mongoose = require("mongoose");
const validator = require("validator");
const bctypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    occupation: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "seller", "admin"],
      default: "user",
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

// singup user

userSchema.statics.signup = async function (
  name,
  email,
  password,
  image,
  address,
  occupation
) {
  if (!name || !email || !password || !image || !address || !occupation) {
    throw new Error("All feilds must be filled!");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Invalid email.");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Password incorrect. Please make sure your password is at least 8 characters long and contains at least one number, one uppercase letter, one lowercase letter, and one symbol"
    );
  }

  const exits = await this.findOne({ email });

  if (exits) {
    throw new Error("Email already used.");
  }

  const salt = await bctypt.genSalt(10);
  const hashPass = await bctypt.hash(password, salt);

  const user = await this.create({
    name,
    email,
    password: hashPass,
    image,
    address,
    occupation,
  });
  return user;
};

// login user
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error("All feilds must be filled!");
  }
  
  const user = await this.findOne({email})
  if (!user) {
    throw Error("Incorrect email or password.");
  }

  const match = await bctypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect email or password.");
  }



  return user;
};

module.exports = mongoose.model("User", userSchema);
