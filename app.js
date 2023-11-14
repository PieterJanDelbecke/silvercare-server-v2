const express = require("express");
const cors = require("cors");
const residentRoutes = require("./routes/residentRoutes");
const staffRoutes = require("./routes/staffRoutes");

const app = express();
const PORT = 4000;

// Use CORS middleware
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Use resident routes
app.use("/resident", residentRoutes);

// Use staff routes
app.use("/staff", staffRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
