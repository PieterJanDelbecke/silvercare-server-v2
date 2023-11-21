"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const config = require("../config/db.config");

const db = {
	sequelize: new Sequelize(config.database, config.username, config.password, {
		dialect: config.dialect,
		port: config.port,
		host: config.host,
		logging: false,
	}),
};

fs.readdirSync(__dirname)
	.filter((file) => {
		return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js" && file.indexOf(".test.js") === -1;
	})
	.forEach((file) => {
		const model = require(path.join(__dirname, file))(db.sequelize, Sequelize.DataTypes);
		db[model.name] = model;
	});

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.Sequelize = Sequelize;

module.exports = db;
