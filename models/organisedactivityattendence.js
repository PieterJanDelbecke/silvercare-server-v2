"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class OrganisedActivityAttendence extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			OrganisedActivityAttendence.belongsTo(models.OrganisedActivity, {
				foreignKey: "organisedActivityId",
				onDelete: "CASCADE",
				onUpdate: "CASCADE",
			});
			OrganisedActivityAttendence.belongsTo(models.Resident, {
				foreignKey: "residentId",
				onDelete: "CASCADE",
				onUpdate: "CASCADE",
			});
		}
	}
	OrganisedActivityAttendence.init(
		{
			organisedActivityId: DataTypes.UUID,
			personType: DataTypes.STRING,
			personId: DataTypes.UUID,
		},
		{
			sequelize,
			modelName: "OrganisedActivityAttendence",
		}
	);
	return OrganisedActivityAttendence;
};
