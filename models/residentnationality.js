"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class ResidentNationality extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			ResidentNationality.belongsTo(models.Resident, {
				foreignKey: "residentId",
			});
		}
	}
	ResidentNationality.init(
		{
			residentId: DataTypes.UUID,
			nationality: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "ResidentNationality",
		}
	);
	return ResidentNationality;
};
