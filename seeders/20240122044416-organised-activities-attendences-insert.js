"use strict";

const { Resident, OrganisedActivity } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const residents = await Resident.findAll();
		const organisedActivities = await OrganisedActivity.findAll();

		const createdAt = new Date();
		const updatedAt = new Date();
		const organisedActivitiesAttendences = [];

		for (const organisedActivity of organisedActivities) {
			// Shuffle the original array using Fisher-Yates algorithm
			for (let i = residents.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[residents[i], residents[j]] = [residents[j], residents[i]];
			}

			// Take the first 10 elements from the shuffled array
			let randomlyPickedResidents = residents.slice(0, 10);

			for (const randomlyPickedResident of randomlyPickedResidents) {
				organisedActivitiesAttendences.push({
					organisedActivityId: organisedActivity.id,
					residentId: randomlyPickedResident.id,
					createdAt,
					updatedAt,
				});
			}
		}

		await queryInterface.bulkInsert("OrganisedActivityAttendences", organisedActivitiesAttendences, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("OrganisedActivityAttendences");
	},
};
