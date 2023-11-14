// routes/residentRoutes.js
const express = require("express");
const router = express.Router();

// Define routes for the "resident" resource
router.get("/", (req, res) => {
	res.send("List of residents");
});

router.get("/:residentId", (req, res) => {
	const residentId = req.params.residentId;
	res.send(`Details of resident ${residentId}`);
});

router.post("/", (req, res) => {
	// Handle creating a new resident
	res.send("Create a new resident");
});

router.put("/:residentId", (req, res) => {
	const residentId = req.params.residentId;
	// Handle updating resident details
	res.send(`Update details of resident ${residentId}`);
});

router.delete("/:residentId", (req, res) => {
	const residentId = req.params.residentId;
	// Handle deleting a resident
	res.send(`Delete resident ${residentId}`);
});

module.exports = router;
