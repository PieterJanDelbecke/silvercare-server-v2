const express = require("express");
const router = express.Router();
const logger = require("../lib/logger");

const { QueryTypes } = require("sequelize");
const { Resident, ResidentInfo, ResidentActivity, Activity, sequelize } = require("../models");
const { residentData } = require("../lib/helpers.js");
const { attendenceData } = require("../lib/chartData.js");

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
		const activities = await Activity.findAll({
			where: {
				removed: false,
			},
		});

		const updatedResidentActivities = [];
		activities.forEach((activity) => {
			const result = residentActivities.find((residentActivity) => residentActivity.activityId === activity.id);
			updatedResidentActivities.push({
				id: activity.id,
				name: activity.activity,
				selected: result ? true : false,
			});
		});
		const initialValues = [];
		updatedResidentActivities.forEach((residentActivity, index) => {
			if (residentActivity.selected) initialValues.push(index.toString());
		});

		const info = residentData(residentInfo);
		logger.info(`GET residentInfo of resident: ${residentId}`);
		res.json({
			info,
			residentActivities,
			editResidentActivities: updatedResidentActivities,
			editActivitiesInitialValues: initialValues,
		});
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

		//TODO: update resident to { id, firstName, lastName, dob, gender }

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
		logger.error("POST resident/addActivities", error);
		res.status(400).send("ERROR");
	}
});

router.post("/editActivities", async (req, res) => {
	const { editedResidentActivities } = req.body;
	const residentId = editedResidentActivities[0].residentId;

	try {
		const deletedResidentActivities = await ResidentActivity.destroy({
			where: {
				residentId,
			},
		});
		const updatedResidentActivities = await ResidentActivity.bulkCreate(editedResidentActivities);
		logger.info(`POST /resident/editActivities: residentId: ${residentId}`);
		res.status(200).send("edited");
	} catch (error) {
		logger.error("POST resident/editActivities", error);
		res.status(400).send("ERROR");
	}
});

router.get("/residentActivities", async (req, res) => {
	const residentId = req.query.residentId;

	try {
		const residentActivities = await ResidentActivity.findAll({
			where: {
				residentId,
			},
		});
		const activities = await Activity.findAll({
			where: {
				removed: false,
			},
		});

		const updatedResidentActivities = [];
		activities.forEach((activity) => {
			const result = residentActivities.find((residentActivity) => residentActivity.activityId === activity.id);
			updatedResidentActivities.push({
				id: activity.id,
				name: activity.activity,
				selected: result ? true : false,
			});
		});
		const initialValues = [];
		updatedResidentActivities.forEach((residentActivity, index) => {
			if (residentActivity.selected) initialValues.push(index.toString());
		});
		logger.info(`GET resident/residentActivities - residentId: ${residentId}`);
		res.json({ updatedResidentActivities, initialValuesActivityOptions: initialValues });
	} catch (error) {
		logger.error(`GET resident/residentActivities - residentId: ${residentId}`, error);
		res.status(400).send("ERROR");
	}
});

router.get("/attendenceData", async (req, res) => {
	const residentId = req.query.residentId;

	try {
		const data = attendenceData();
		res.json(data);
	} catch (error) {
		logger.error("GET resident/residentCharts:", error);
		res.send("ERROR: resident/residentCharts");
	}
});

module.exports = router;
