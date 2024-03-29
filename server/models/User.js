const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  canEdit: { type: Boolean, default: false },
  token: { type: String }
});

module.exports = mongoose.model("User", UserSchema);
