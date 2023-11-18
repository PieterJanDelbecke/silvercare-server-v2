"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */

		const createdAt = new Date();
		const updatedAt = new Date();

		return await queryInterface.bulkInsert(
			"Infos",
			[
				{ id: 1, info: "language", createdAt, updatedAt },
				{ id: 2, info: "nationality", createdAt, updatedAt },
				{ id: 3, info: "religion", createdAt, updatedAt },
				{ id: 4, info: "activity", createdAt, updatedAt },
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */

		return await queryInterface.bulkDelete("Infos");
	},
};
