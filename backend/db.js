const mongoose = require("mongoose");
const { DATABASE_URL } = require("./config");
const { Schema } = mongoose;

mongoose
  .connect(`${DATABASE_URL}`)
  .then(() => console.log("Database connected"));

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    trim: true,
    minLength: 3,
    maxLength: 20,
  },
  firstname: { type: String, required: true, maxLength: 50, trim: true },
  lastname: { type: String, required: true, maxLength: 50, trim: true },
  password: { type: String, required: true, minLength: 8 },
});

const accountSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);
module.exports = { User, Account };
