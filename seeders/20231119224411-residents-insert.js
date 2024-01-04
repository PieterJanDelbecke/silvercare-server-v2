"use strict";

const { v4: uuidv4 } = require("uuid");
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const createdAt = new Date();
		const updatedAt = new Date();
		const uuidResidents = [];
		for (let i = 0; i < 15; i++) {
			uuidResidents.push(uuidv4());
		}
		const nationalities = ["Australia", "Italy", "Greece", "New Zealand"];
		const languages = ["English", "Italian", "Greek", "English"];
		const religions = ["Christian", "Jewish", "Buddhist", "Muslim", "Hindu", "Atheist"];

		const residents = uuidResidents.map((uuid, index) => {
			return {
				id: uuid,
				firstName: faker.person.firstName(),
				lastName: faker.person.lastName(),
				dob: faker.date.birthdate(),
				gender: faker.person.sexType(),
				practicingReligion: Math.floor(Math.random() * 2) ? true : false,
				createdAt,
				updatedAt,
			};
		});

		const residentsInfos = [];
		const residentsActivities = [];

		uuidResidents.forEach((uuid, index) => {
			const random = Math.floor(Math.random() * 4);
			const residentNatioality = nationalities[random];
			const residentLanguage = languages[random];
			const residentReligion = religions[Math.floor(Math.random() * 6)];
			const residentActivityId = Math.floor(Math.random() * 40); // there are 40 activities, they have an id form 0 untill 39

			const nationality = {
				id: uuidv4(),
				residentId: uuid,
				infoId: 1,
				info: residentNatioality,
				createdAt,
				updatedAt,
			};
			residentsInfos.push(nationality);

			const language = {
				id: uuidv4(),
				residentId: uuid,
				infoId: 2,
				info: residentLanguage,
				createdAt,
				updatedAt,
			};
			residentsInfos.push(language);

			const religion = {
				id: uuidv4(),
				residentId: uuid,
				infoId: 3,
				info: residentReligion,
				createdAt,
				updatedAt,
			};
			residentsInfos.push(religion);

			const activity = {
				id: uuidv4(),
				residentId: uuid,
				activityId: residentActivityId,
				createdAt,
				updatedAt,
			};
			residentsActivities.push(activity);
		});

		await queryInterface.bulkInsert("Residents", residents, {});
		await queryInterface.bulkInsert("ResidentInfos", residentsInfos, {});
		await queryInterface.bulkInsert("ResidentActivities", residentsActivities, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Residents");
		await queryInterface.bulkDelete("ResidentInfos");
		await queryInterface.bulkDelete("ResidentActivities");
	},
};
