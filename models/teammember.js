"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class TeamMember extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			TeamMember.hasMany(models.OrganisedActivity, {
				foreignKey: "teamMemberId",
				onDelete: "CASCADE",
				onUpdate: "CASCADE",
			});
		}
	}
	TeamMember.init(
		{
			firstName: DataTypes.STRING,
			lastName: DataTypes.STRING,
			admin: DataTypes.BOOLEAN,
			role: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "TeamMember",
		}
	);
	return TeamMember;
};
