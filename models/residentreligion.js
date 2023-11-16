"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class ResidentReligion extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			ResidentReligion.belongsTo(models.Resident, {
				foreignKey: "residentId",
			});
		}
	}
	ResidentReligion.init(
		{
			residentId: DataTypes.UUID,
			religion: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "ResidentReligion",
		}
	);
	return ResidentReligion;
};