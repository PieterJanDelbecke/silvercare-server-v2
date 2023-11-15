// routes/residentRoutes.js
const express = require("express");
const router = express.Router();
const logger = require("../lib/logger");

const mockResidentsData = require("../mock-data/residentsMockData.json");

// Define routes for the "resident" resource
router.get("/residents", (req, res) => {
	res.send(mockResidentsData);
});

router.get("/:residentId", (req, res) => {
	const residentId = req.params.residentId;

	const mockResidentData = {
		firstName: "Pieter",
		lastName: "Delbecke",
		residentId: residentId,
	};

	res.send(mockResidentData);
});

router.post("/add", (req, res) => {
	console.log("req.body", req.body);
	const newResident = req.body;
	//
	logger.info(`Added new resident: ${newResident.firstName} ${newResident.lastName}`);
	// logger.error(`error new resident: ${newResident.firstName} ${newResident.lastName}`);
	res.send(newResident);
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
