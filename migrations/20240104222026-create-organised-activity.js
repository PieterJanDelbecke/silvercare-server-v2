"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("OrganisedActivities", {
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
				defaultValue: Sequelize.literal("uuid_generate_v4()"),
			},
			activityId: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			teamMemberId: {
				type: Sequelize.UUID,
			},
			date: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			comment: {
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
		await queryInterface.dropTable("OrganisedActivities");
	},
};
