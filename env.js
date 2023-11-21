const dotenv = require("dotenv");

dotenv.config({ path: `${__dirname}/.env.${process.env.NODE_ENV}` });

module.exports = dotenv;
