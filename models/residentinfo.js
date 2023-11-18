"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class ResidentInfo extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			ResidentLanguage.belongsTo(models.Resident, {
				foreignKey: "residentId",
			});
			ResidentLanguage.belongsTo(models.Info, {
				foreignKey: "infoId",
			});
		}
	}
	ResidentInfo.init(
		{
			residentId: DataTypes.UUID,
			infoId: DataTypes.UUID,
			info: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "ResidentInfo",
		}
	);
	return ResidentInfo;
};
