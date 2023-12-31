const express = require("express");
const cors = require("cors");
require("./env.js");

const residentRoutes = require("./routes/residentRoutes");
const staffRoutes = require("./routes/staffRoutes");
const adminRoutes = require("./routes/adminRoutes");
const activityRoutes = require("./routes/activityRoutes");

const app = express();
const PORT = process.env.HTTP_PORT;
const API_URL = process.env.API_URL;

// Use CORS middleware
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.use("/admin", adminRoutes);
app.use("/resident", residentRoutes);
app.use("/staff", staffRoutes);
app.use("/activity", activityRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on ${API_URL}`);
});
