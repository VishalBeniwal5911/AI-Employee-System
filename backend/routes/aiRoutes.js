const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  getRecommendation,
} = require("../controllers/aiController");

router.post("/recommend", auth, getRecommendation);

module.exports = router;