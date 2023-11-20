"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return await queryInterface.addColumn("Residents", "practicingReligion", {
			type: Sequelize.BOOLEAN,
			allowNull: false,
		});
	},

	async down(queryInterface, Sequelize) {
		return await queryInterface.removeColumn("Residents", "practicingReligion");
	},
};
