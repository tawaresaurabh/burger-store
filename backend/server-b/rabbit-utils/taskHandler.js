#!/usr/bin/env node
// Process tasks from the work queue

"use strict";

var amqp = require("amqplib");

const rabbitmq = "rabbitmq:5672";
const orderGenerationQueue = "orderGenerationQueue";
const orderCompletionQueue = "orderCompletionQueue";

module.exports.handleTasks = function (
	rabbitHost = rabbitmq,
	sendQueueName = orderGenerationQueue,
	receiveQueueName = orderCompletionQueue
) {
	amqp
		.connect("amqp://" + rabbitHost)
		.then(async function (conn) {
			process.once("SIGINT", function () {
				conn.close();
			});
			const ch = await conn.createChannel();
			var ok = ch.assertQueue(sendQueueName, { durable: true });
			ok = ch.assertQueue(receiveQueueName, { durable: true });
			ok = ok.then(function () {
				ch.prefetch(1);
			});
			ok = ok.then(function () {
				ch.consume(sendQueueName, doWork, { noAck: false });
				console.log(" [*] Waiting for messages. To exit press CTRL+C");
			});
			return await ok;
			function doWork(msg) {
				const order = JSON.parse(msg.content.toString());
				ch.ack(msg);
				console.log("server-b: Received  ", order);

				const prepareStage = [
					{ status: "ordered" },
					{ status: "received"},
					{ status: "inQueue"},
					{ status: "inQueue"},
					{ status: "ready"},
				];
				// ["ordered", "received", "inQueue", "ready", "failed"]
				// Reponse every second with the new status
				prepareStage.map((stage, i) => {
					setTimeout(() => {
						// addTask();
						const newOrderState = { ...order, ...stage };

						ch.sendToQueue(
							receiveQueueName,
							new Buffer.from(JSON.stringify(newOrderState)),
							{},
							function (err, ok_1) {
								if (err !== null) console.warn(new Date(), "Message nacked!");
								else console.log(new Date(), "Message acked");
							}
						);

						console.log("server-b: Sent  ", newOrderState);
					}, (i + 1) * 5000);
				});
			}
		})
		.catch(console.warn);
};
