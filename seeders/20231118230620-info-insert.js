"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const createdAt = new Date();
		const updatedAt = new Date();

		return await queryInterface.bulkInsert(
			"Infos",
			[
				{ id: 1, info: "nationality", createdAt, updatedAt },
				{ id: 2, info: "language", createdAt, updatedAt },
				{ id: 3, info: "religion", createdAt, updatedAt },
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		return await queryInterface.bulkDelete("Infos");
	},
};
