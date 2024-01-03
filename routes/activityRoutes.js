const express = require("express");
const router = express.Router();
const logger = require("../lib/logger");

router.post("/new", async (req, res) => {
	console.log("activity/new: ", req.body);
	res.send("### RECEIVED");
});

module.exports = router;
