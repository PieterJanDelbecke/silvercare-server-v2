const express = require("express");
const router = express.Router();
const logger = require("../lib/logger");

const { Activity, Resident } = require("../models");

const team = [
	{ value: 0, label: "Alessandra Salso" },
	{ value: 1, label: "Michael Diaz" },
	{ value: 2, label: "JD" },
	{ value: 3, label: "Andrea Goodsoul" },
];

router.get("/firstload", async (req, res) => {
	try {
		const residents = await Resident.findAll({
			attributes: ["id", "firstName", "lastName", "dob", "gender"],
		});
		const activities = await Activity.findAll({
			attributes: ["id", "activity", "removed"],
		});
		res.json({ residents, activities, team });
	} catch (error) {
		logger.error("admin/firstload:", error);
		res.send("Error: resident/residents");
	}
});

router.get("/activities", async (req, res) => {
	try {
		const activities = await Activity.findAll({
			attributes: ["id", "activity", "removed"],
		});
		res.json(activities);
	} catch (error) {
		logger.error("admin/activities:", error);
		res.send("ERROR: admin/activities");
	}
});

module.exports = router;
