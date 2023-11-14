// routes/staffRoutes.js
const express = require("express");
const router = express.Router();

// Define routes for the "staff" resource
router.get("/", (req, res) => {
	res.send("List of staff members");
});

router.get("/:staffId", (req, res) => {
	const staffId = req.params.staffId;
	res.send(`Details of staff member ${staffId}`);
});

router.post("/", (req, res) => {
	// Handle creating a new staff member
	res.send("Create a new staff member");
});

router.put("/:staffId", (req, res) => {
	const staffId = req.params.staffId;
	// Handle updating staff member details
	res.send(`Update details of staff member ${staffId}`);
});

router.delete("/:staffId", (req, res) => {
	const staffId = req.params.staffId;
	// Handle deleting a staff member
	res.send(`Delete staff member ${staffId}`);
});

module.exports = router;
