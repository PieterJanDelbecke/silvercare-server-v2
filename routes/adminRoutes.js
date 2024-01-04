const express = require("express");
const router = express.Router();
const logger = require("../lib/logger");

const { Activity, Resident } = require("../models");

const team = [
	{ value: "e1ceace8-900c-4d10-a7a0-e626a61765e3", label: "Alessandra Salso" },
	{ value: "66455b44-2970-4668-9174-aaa7a110e429", label: "Michael Diaz" },
	{ value: "51332377-5aeb-430e-810f-0b123c85dee8", label: "JD" },
	{ value: "da967e09-4dd2-42d5-96b7-04d5c1dc2ef6", label: "Andrea Goodsoul" },
	{ value: "ee69a1d3-776a-4d27-85f9-c84864dba445", label: "Casey Whong" },
	{ value: "8d2f4d03-7120-4b6a-b9e8-003331df5b2a", label: "Marissa Mayer" },
	{ value: "c3e5f06c-1214-4ffb-b3c1-d4a16ad9020c", label: "Eric Schmidt" },
	{ value: "e6bbc4b7-a184-4a7c-899c-dde2174cae38", label: "Alex Kapranos" },
	{ value: "ea64bbd8-d1bd-4fe6-9db7-c94b1acdaeca", label: "Jack White" },
	{ value: "b8078384-ee19-488f-8d70-9e4eec4082d6", label: "Dave Ginsbergh" },
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
