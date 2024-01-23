const express = require("express");
const router = express.Router();
const logger = require("../lib/logger");

const { Activity, Resident, TeamMember, OrganisedActivity, OrganisedActivityAttendence } = require("../models");

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
		const lastFiveOrganisedActivities = await OrganisedActivity.findAll({
			order: [["date", "DESC"]],
			limit: 5,
			attributes: ["id", "activityId", "teamMemberId", "date"],
			include: [
				{
					model: Activity,
					attributes: ["activity"],
				},
				{
					model: OrganisedActivityAttendence,
					attributes: ["id"],
				},
			],
		});

		const result = lastFiveOrganisedActivities.map((activity) => {
			return {
				activityName: activity.Activity.activity,
				id: activity.id,
				date: activity.date,
				residentCount: activity.OrganisedActivityAttendences.length,
			};
		});

		console.log("### result", result);

		res.json({ residents, activities, teamMembers, lastOrganisedActivities: result });
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
