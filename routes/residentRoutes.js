// routes/residentRoutes.js
const express = require("express");
const router = express.Router();
const logger = require("../lib/logger");

const { Resident, ResidentInfo } = require("../models");

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

router.post("/add", async (req, res) => {
	// console.log("### req.body", req.body);
	const {
		firstName,
		lastName,
		dob,
		gender,
		nationalities,
		languages,
		religions,
		practicingReligion,
		activitiesOptions,
	} = req.body;

	try {
		const resident = await Resident.create({
			firstName,
			lastName,
			dob,
			gender,
			practicingReligion,
		});
		const residentId = resident.dataValues.id;

		const bulkNationalities = nationalities.map((nationality) => {
			return { residentId, infoId: 1, info: nationality };
		});
		const bulkLanguages = languages.map((language) => {
			return { residentId, infoId: 2, info: language };
		});
		const bulkReligions = religions.map((religion) => {
			return { residentId, infoId: 3, info: religion };
		});
		const bulkAcivityOptions = activitiesOptions.map((activity) => {
			return { residentId, infoId: 4, info: activity };
		});

		const info = [...bulkNationalities, ...bulkLanguages, ...bulkReligions, ...bulkAcivityOptions];

		const insertedInfo = await ResidentInfo.bulkCreate(info);

		res.json(resident);
		logger.info(`added new Resident: ${firstName} ${lastName} - residentId: ${resident.dataValues.id}`);
	} catch (error) {
		logger.error("resident/add:", error);
		res.send("ERROR: resident/add");
	}
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
