const express = require("express");
const UserInputController = require("../controllers/userinput");
const router = express.Router();

const checkAuth = require("../middleware/check-auth");

router.post(
  "/create",
  checkAuth,
  UserInputController.createInput);

router.post(
  "/delete",
  checkAuth,
  UserInputController.deleteInput);

router.get("/comments", UserInputController.getComments);

module.exports = router;
