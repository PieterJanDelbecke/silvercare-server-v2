const express = require("express");
const router = express.Router();
const logger = require("../lib/logger");

const { Resident, ResidentInfo, ResidentActivity, Activity } = require("../models");
const { residentData } = require("../lib/helpers.js");

router.get("/residents", async (req, res) => {
	try {
		const residents = await Resident.findAll({
			attributes: ["id", "firstName", "lastName", "dob", "gender"],
		});
		res.json(residents);
	} catch (error) {
		logger.error("GET resident/residents:", error);
		res.send("ERROR: resident/residents");
	}
});

router.get("/resident", async (req, res) => {
	const residentId = req.query.residentId;
	console.log("=> 2 ### residentId: ", residentId);

	try {
		const residentInfo = await ResidentInfo.findAll({
			where: {
				residentId,
			},
		});
		const residentActivities = await ResidentActivity.findAll({
			where: {
				residentId,
			},
			attributes: ["activityId"],
			include: [
				{
					model: Activity,
					attributes: ["activity"],
				},
			],
		});
		const info = residentData(residentInfo);
		logger.info(`GET residentInfo of resident: ${residentId}`);
		res.json({ info, residentActivities });
	} catch (error) {
		logger.error("GET resident/:residentId", error);
		res.send("ERROR: resident/residents");
	}
});

router.post("/add", async (req, res) => {
	const { firstName, lastName, dob, gender, nationalities, languages, religions, practicingReligion } = req.body;

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

		const insertedInfo = await ResidentInfo.bulkCreate(bulkResidentInfo);

		res.json(resident);
		logger.info(`POST new Resident: ${firstName} ${lastName} - residentId: ${resident.dataValues.id}`);
	} catch (error) {
		logger.error("POST resident/add:", error);
		res.send("ERROR: POST resident/add");
	}
});
router.post("/addActivities", async (req, res) => {
	const { residentId, activityIds } = req.body;

	const bulkResidentActivities = activityIds.map((activityId) => {
		return { residentId, activityId };
	});

	try {
		const insertedResidentActivities = await ResidentActivity.bulkCreate(bulkResidentActivities);
		logger.info(`POST /resident/addActivities: residentId: ${residentId}`);
		res.status(200).send("inserted");
	} catch (error) {
		console.error(error);
		logger.error("POST resident/addActivities", error);
	}
});

router.get("/residentActivities", async (req, res) => {
	const residentId = req.query.residentId;

	try {
		const result = await ResidentActivity.findAll({
			where: {
				residentId,
			},
		});
		console.log("### result: ", result);
		logger.info(`GET resident/residentActivities - residentId; ${residentId} `, result);
		res.json(result);
	} catch (error) {
		console.error(error);
		logger.error("GET resident/residentActivities", error);
	}
});

module.exports = router;
