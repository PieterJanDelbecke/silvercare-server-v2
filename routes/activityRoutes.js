const express = require("express");
const router = express.Router();
const logger = require("../lib/logger");

const { QueryTypes } = require("sequelize");
const { OrganisedActivity, OrganisedActivityAttendence, sequelize } = require("../models");

router.post("/new", async (req, res) => {
	console.log("activity/new: ", req.body);
	const { activity, teamMemberId, date, comment, attendingResidentIds } = req.body;
	try {
		const newOrganisedActivity = {
			activityId: activity.value,
			teamMemberId,
			comment,
			date,
		};
		const insertedOrganisedActivity = await OrganisedActivity.create(newOrganisedActivity);

		const organisedActivityId = insertedOrganisedActivity.id;
		const newActivityAttendingResidents = attendingResidentIds.map((attendingResidentId) => {
			return { organisedActivityId, residentId: attendingResidentId };
		});

		const insertedOrganisedActivityAttendence = await OrganisedActivityAttendence.bulkCreate(
			newActivityAttendingResidents
		);
		res.json(insertedOrganisedActivity);
	} catch (error) {
		logger.error("POST activity/new: ", error);
		res.send("ERROR: POST activity/new");
	}
});

module.exports = router;
