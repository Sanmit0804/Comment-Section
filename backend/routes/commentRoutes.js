const express = require("express");
const router = express.Router();
const {
  getComments,
  addComments,
} = require("../controllers/commentController");

router.get("/", getComments);
router.post("/", addComments);

module.exports = router;
