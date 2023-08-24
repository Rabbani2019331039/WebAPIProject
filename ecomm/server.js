require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./database/dbConn");
const mongoose = require("mongoose");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const PORT = process.env.PORT || 5005;

connectDB();

app.use(cors(corsOptions));

app.use(express.json());

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	next();
});

//connection to database
mongoose.connection.once("open", () => {
	console.log("connected to mongodb");
	app.listen(PORT, () => console.log(`server running on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
	console.log(err);
});

app.use("/", require("./routes/ecommRoutes"));
