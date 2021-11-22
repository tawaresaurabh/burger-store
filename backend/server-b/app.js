const rabbitHost = "rabbitmq:5672";
const orderGenerationQueue = "orderGenerationQueue";
const orderCompletionQueue = "orderCompletionQueue";
const rabbitTaskHandler = require("./rabbit-utils/taskHandler.js")

rabbitTaskHandler.handleTasks(rabbitHost, orderGenerationQueue, orderCompletionQueue);
