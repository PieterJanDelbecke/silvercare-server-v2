const express = require("express");
const router = express.Router();
const logger = require("../lib/logger");

const { Activity, Resident, TeamMember } = require("../models");

router.get("/firstload", async (req, res) => {
	try {
		const residents = await Resident.findAll({
			attributes: ["id", "firstName", "lastName", "dob", "gender"],
		});
		const activities = await Activity.findAll({
			attributes: ["id", "activity", "removed"],
		});
		const teamMembers = await TeamMember.findAll({
			attributes: ["id", "firstName", "lastName", "admin", "role"],
		});
		console.log("teamMembers: ", teamMembers);
		res.json({ residents, activities, teamMembers });
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
