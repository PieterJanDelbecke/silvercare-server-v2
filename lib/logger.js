const winston = require("winston");

// Define the logger with two transports: one for console and one for a file
const logger = winston.createLogger({
	level: "info",
	format: winston.format.combine(
		winston.format.timestamp(),
		winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
	),
	transports: [new winston.transports.Console(), new winston.transports.File({ filename: "app.log" })],
});

module.exports = logger;
