"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const createdAt = new Date();
		const updatedAt = new Date();

		const teamMembers = [
			{
				firstName: "Alessandra",
				lastName: "Salso",
				admin: true,
				role: "managment",
				createdAt,
				updatedAt,
			},
			{
				firstName: "Michael",
				lastName: "Diaz",
				admin: true,
				role: "managment",
				createdAt,
				updatedAt,
			},
			{
				firstName: "Juan",
				lastName: "Diego",
				admin: true,
				role: "staff",
				createdAt,
				updatedAt,
			},
			{
				firstName: "Andrea",
				lastName: "Goodsoul",
				admin: false,
				role: "staff",
				createdAt,
				updatedAt,
			},
			{
				firstName: "Casey",
				lastName: "Whong",
				admin: false,
				role: "staff",
				createdAt,
				updatedAt,
			},
			{
				firstName: "Marissa",
				lastName: "Mayer",
				admin: false,
				role: "staff",
				createdAt,
				updatedAt,
			},
			{
				firstName: "Eric",
				lastName: "Schmidt",
				admin: false,
				role: "staff",
				createdAt,
				updatedAt,
			},
			{
				firstName: "Alex",
				lastName: "Kapranos",
				admin: false,
				role: "staff",
				createdAt,
				updatedAt,
			},
			{
				firstName: "Jack",
				lastName: "White",
				admin: false,
				role: "staff",
				createdAt,
				updatedAt,
			},
			{
				firstName: "Dave",
				lastName: "Ginsbergh",
				admin: false,
				role: "staff",
				createdAt,
				updatedAt,
			},
		];
		await queryInterface.bulkInsert("TeamMembers", teamMembers, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("TeamMembers");
	},
};
