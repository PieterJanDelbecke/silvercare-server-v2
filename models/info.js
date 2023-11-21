"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Info extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Info.hasMany(models.ResidentInfo, {
				foreignKey: "residentId",
				onDelete: "CASCADE",
				onUpdate: "CASCADE",
			});
		}
	}
	Info.init(
		{
			info: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Info",
		}
	);
	return Info;
};
