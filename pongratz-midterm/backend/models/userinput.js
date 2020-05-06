const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userInputSchema = mongoose.Schema({
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  username: { type: String, required: true },
  championName: { type: String, required: true },
  date: {
    type: Date,
    default: Date.now
  }
});

userInputSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Userinput", userInputSchema);
