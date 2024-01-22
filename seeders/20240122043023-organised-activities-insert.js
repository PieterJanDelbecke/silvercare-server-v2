"use strict";

const { TeamMember } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const teamMembers = await TeamMember.findAll();
		const createdAt = new Date();
		const updatedAt = new Date();
		// console.log("### TeamMemebers: ", teamMembers);

		const OrganisedActivies = [
			{
				activityId: 0,
				teamMemberId: teamMembers[0].id,
				date: "01/01/224",
				comment: "great team play",
				createdAt,
				updatedAt,
			},
			{
				activityId: 1,
				teamMemberId: teamMembers[1].id,
				date: "01/01/224",
				comment: "Manly Dam",
				createdAt,
				updatedAt,
			},
			{
				activityId: 2,
				teamMemberId: teamMembers[2].id,
				date: "01/01/224",
				comment: "painting of murals",
				createdAt,
				updatedAt,
			},
			{
				activityId: 3,
				teamMemberId: teamMembers[3].id,
				date: "01/01/224",
				comment: "discussing the news",
				createdAt,
				updatedAt,
			},
			{
				activityId: 4,
				teamMemberId: teamMembers[4].id,
				date: "01/01/224",
				comment: "yin yoga",
				createdAt,
				updatedAt,
			},
			{
				activityId: 5,
				teamMemberId: teamMembers[5].id,
				date: "01/01/224",
				comment: "salsa",
				createdAt,
				updatedAt,
			},
		];

		await queryInterface.bulkInsert("OrganisedActivities", OrganisedActivies, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("OrganisedActivities");
	},
};
