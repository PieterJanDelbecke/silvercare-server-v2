"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const createdAt = new Date();
		const updatedAt = new Date();
		const removed = false;
		const seedActivities = ["bingo", "bustrips", "music", "gardening"];
		const activities = seedActivities.map((activity, index) => {
			return {
				id: index,
				activity,
				removed,
				createdAt,
				updatedAt,
			};
		});
		await queryInterface.bulkInsert("Activities", activities, {});
	},

	async down(queryInterface, Sequelize) {
		return await queryInterface.bulkDelete("Activities");
	},
};
