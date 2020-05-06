const mongoose = require("mongoose");

const championSchema = mongoose.Schema({
  id: { type: String, required: true },
  key: { type: String, required: true },
  name: { type: String, required: true },
  title: { type: String, required: true },
  tags: { type: Array, required: true },
  stats : {
    hp : String,
    hpperlevel : String,
    mp: String,
    mpperlevel: String,
    movespeed: String,
    armor: String,
    armorperlevel: String,
    spellblock: String,
    spellblockperlevel: String,
    attackrange: String,
    hpregen: String,
    hpregenperlevel: String,
    mpregen: String,
    mpregenperlevel: String,
    crit: String,
    critperlevel: String,
    attackdamage: String,
    attackdamageperlevel: String,
    attackspeedoffset: String,
    attackspeedperlevel: String,
     },
  icon: { type: String, required: true },
  sprite: {
    url: String,
    x: String,
    y: String,
  },
  description: { type: String, required: true }
});

module.exports = mongoose.model("Champion", championSchema);
