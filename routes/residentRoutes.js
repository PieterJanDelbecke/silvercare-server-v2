const express = require("express");
const router = express.Router();
const logger = require("../lib/logger");

const { Resident, ResidentInfo, ResidentActivity } = require("../models");
const { residentData } = require("../lib/helpers.js");

router.get("/residents", async (req, res) => {
	try {
		const residents = await Resident.findAll({
			attributes: ["id", "firstName", "lastName", "dob", "gender"],
		});
		res.json(residents);
	} catch (error) {
		logger.error("resident/residents:", error);
		res.send("ERROR: resident/residents");
	}
});

router.get("/:residentId", async (req, res) => {
	const residentId = req.params.residentId;

	try {
		const residentInfo = await ResidentInfo.findAll({
			where: {
				residentId,
			},
		});
		const info = residentData(residentInfo);
		logger.info(`GET residentInfo of resident: ${residentId}`);
		res.json(info);
	} catch (error) {
		logger.error("resident/residents:", error);
		res.send("ERROR: resident/residents");
	}
});

router.post("/add", async (req, res) => {
	// console.log("### req.body", req.body);
	const { firstName, lastName, dob, gender, nationalities, languages, religions, practicingReligion, activityIds } =
		req.body;

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

		const bulkResidentInfo = [...bulkNationalities, ...bulkLanguages, ...bulkReligions];

		const bulkAcivityOptions = activityIds.map((activityId) => {
			return { residentId, activityId };
		});

		const insertedInfo = await ResidentInfo.bulkCreate(bulkResidentInfo);
		const insertedActivities = await ResidentActivity.bulkCreate(bulkAcivityOptions);

		res.json(resident);
		logger.info(`PUT new Resident: ${firstName} ${lastName} - residentId: ${resident.dataValues.id}`);
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
