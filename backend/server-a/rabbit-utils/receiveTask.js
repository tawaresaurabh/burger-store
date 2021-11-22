#!/usr/bin/env node
// Process tasks from the work queue

"use strict";

var amqp = require("amqplib");

// make requests to orders in db
const dbUtils = require("../utils/dbUtils");
const Order = require("../models/order");

// Rabbit hostname:port
const rabbitmq = "rabbitmq:5672";
// Queue name for processed order
const orderCompletionQueue = "orderCompletionQueue";

module.exports.getTask = function (
	rabbitHost = rabbitmq,
	queueName = orderCompletionQueue
) {
	amqp
		.connect("amqp://" + rabbitHost)
		.then(async function (conn) {
			process.once("SIGINT", function () {
				conn.close();
			});
			const ch = await conn.createChannel();
			var ok = ch.assertQueue(queueName, { durable: true });
			ok = ok.then(function () {
				ch.prefetch(1);
			});
			ok = ok.then(function () {
				ch.consume(queueName, doWork, { noAck: false });
				console.log(" [*] Waiting for messages. To exit press CTRL+C");
			});
			return await ok;

			// function to update db for processed order
			function doWork(msg) {
				const order = JSON.parse(msg.content.toString());
				console.log("server-a: Received  ", order);
				dbUtils.updateItemById(Order, order._id, { status: order.status });
				ch.ack(msg);
			}
		})
		.catch(console.warn);
};
