"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class ResidentActivity extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			ResidentActivity.belongsTo(models.Resident, {
				foreignKey: "residentId",
			});
		}
	}
	ResidentActivity.init(
		{
			residentId: DataTypes.UUID,
			activity: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "ResidentActivity",
		}
	);
	return ResidentActivity;
};
