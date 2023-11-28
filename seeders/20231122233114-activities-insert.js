"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const createdAt = new Date();
		const updatedAt = new Date();
		const removed = false;
		const seedActivities = [
			"bingo",
			"bustrip",
			"art & craft",
			"men's club",
			"stretching class",
			"dance therapy",
			"exercises",
			"drum therapy",
			"kids program",
			"beaty therapy",
			"domino",
			"cooking class",
			"painting",
			"knitting",
			"wellness therapy",
			"computer class/ use",
			"ring toss game",
			"dart game",
			"piano lesson",
			"tai chi",
			"quiz",
			"puzzel surprise",
			"gardening",
			"flower arrangement",
			"massage therapy",
			"modified volleyball",
			"modified basketball",
			"modified bowling",
			"singing/entertainment",
			"reading",
			"movie",
			"listen to radio",
			"happy hour",
			"discussion group",
			"coffee club/ tea with reminissence",
			"news paper reading",
			"book club",
			"garden walking",
			"bbq",
			"manicure",
			"one to one",
		];
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
