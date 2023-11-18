"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Residents", {
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
				defaultValue: Sequelize.literal("uuid_generate_v4()"),
			},
			firstName: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			lastName: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			dob: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			gender: {
				type: Sequelize.STRING,
				allowNull: false,
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
		await queryInterface.dropTable("Residents");
	},
};
