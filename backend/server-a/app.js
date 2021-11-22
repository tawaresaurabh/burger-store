const express = require("express");
const cors = require("cors");
const http = require("http");

const rabbitTaskReceiver = require("./rabbit-utils/receiveTask");

const app = express();

// Init message broker
const rabbitHost = "rabbitmq:5672";
const orderCompletionQueue = "orderCompletionQueue";
// const orderGenerationQueue = "orderGenerationQueue";
rabbitTaskReceiver.getTask(rabbitHost, orderCompletionQueue);

const mongoHost = "mongodb:27017";
const dbName = "sandwich";
//  Get db
const db = require("./models/db");
// Connect to db
db.connectDB(`mongodb://${mongoHost}/${dbName}`);

const PORT = 5001;

const router = require("./routes/index");

app.use(cors());
app.options("*", cors());
app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({ extended: false })); //Parse URL-encoded bodies

app.use("/", router);

const server = http.createServer(app);

// Close server
server.on("close", () => console.log("Server-a closed."));

// Close server
server.on("error", (err) => {
	console.log(`Server-a error: ${err}`);
	server.close();
});

// Server starts listening
server.listen(PORT, () => console.log(`Server-a: Listening on ports: ${PORT}`));

