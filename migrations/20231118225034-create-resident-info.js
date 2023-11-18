"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("ResidentInfos", {
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
				defaultValue: Sequelize.literal("uuid_generate_v4()"),
			},
			residentId: {
				type: Sequelize.UUID,
			},
			infoId: {
				type: Sequelize.INTEGER,
			},
			info: {
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
		await queryInterface.dropTable("ResidentInfos");
	},
};
