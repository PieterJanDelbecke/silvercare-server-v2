"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class OrganisedActivity extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			OrganisedActivity.hasMany(models.OrganisedActivityAttendence, {
				foreignKey: "organisedActivityId",
				onDelete: "CASCADE",
				onUpdate: "CASCADE",
			});
			OrganisedActivity.belongsTo(models.Activity, {
				foreignKey: "activityId",
				onDelete: "CASCADE",
				onUpdate: "CASCADE",
			});
			OrganisedActivity.belongsTo(models.TeamMember, {
				foreignKey: "teamMemberId",
				onDelete: "CASCADE",
				onUpdate: "CASCADE",
			});
		}
	}
	OrganisedActivity.init(
		{
			activityId: DataTypes.INTEGER,
			date: DataTypes.DATE,
			comment: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "OrganisedActivity",
		}
	);
	return OrganisedActivity;
};
