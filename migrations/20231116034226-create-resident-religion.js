"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("ResidentReligions", {
			id: {
				primaryKey: true,
				defaultValue: Sequelize.literal("uuid_generate_v4()"),
				type: Sequelize.UUID,
			},
			residentId: {
				allowNull: false,
				type: Sequelize.UUID,
			},
			religion: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("ResidentReligions");
	},
};
