const mongoose = require("mongoose");

const championSchema = mongoose.Schema({
  id: { type: String, required: true },
  key: { type: String, required: true },
  name: { type: String, required: true },
  title: { type: String, required: true },
  icon: { type: String, required: true },
  description: { type: String, required: true }
});

module.exports = mongoose.model("Champion", championSchema);
