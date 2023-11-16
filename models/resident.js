"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Resident extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Resident.hasMany(models.ResidentLanguage, {
				foreignKey: "residentId",
			});
			Resident.hasMany(models.ResidentNationality, {
				foreignKey: "residentId",
			});
			Resident.hasMany(models.ResidentReligion, {
				foreignKey: "residentId",
			});
		}
	}
	Resident.init(
		{
			firstName: DataTypes.STRING,
			lastName: DataTypes.STRING,
			dob: DataTypes.DATE,
			gender: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Resident",
		}
	);
	return Resident;
};
