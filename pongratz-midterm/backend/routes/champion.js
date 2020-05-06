const express = require("express");
const ChampionController = require("../controllers/champion");
const router = express.Router();

router.get('/detail', ChampionController.championDetails);

router.get("/champions", ChampionController.champions);

router.get("/search", ChampionController.championSearch);

router.get("/init", ChampionController.init);

module.exports = router;
