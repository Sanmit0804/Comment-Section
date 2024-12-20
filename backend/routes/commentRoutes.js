const express = require("express");
const router = express.Router();
const {
  getComments,
  addComment,
} = require("../controllers/commentController");

router.get("/", getComments);
router.post("/", addComment);

module.exports = router;
