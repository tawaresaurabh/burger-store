const express = require("express");
const router = express.Router();

const rabbitHost = "rabbitmq:5672";
const rabbitTaskSender = require("../rabbit-utils/sendTask");
const orderGenerationQueue = "orderGenerationQueue";

const dbUtils = require("../utils/dbUtils");
const Order = require("../models/order");

/* GET order by id. */
router.get("/:orderId", async function (req, res) {
	const orderId = req.params.orderId;
	try {
		const order = await dbUtils.getItemById(Order, orderId);
		res.json(order);
	} catch (err) {
		console.log(err);
		res.json({ err });
	}
});

/* DELETE order by id. */
router.delete("/:orderId", async function (req, res) {
	const orderId = req.params.orderId;
	try {
		const order = await dbUtils.deleteItemById(Order, orderId);
		res.json(order);
	} catch (err) {
		console.log(err);
		res.json({ err });
	}
});

/* GET all orders for a user. */
router.get("/", async function (req, res) {
	const user = res.locals.userData;
	try {
		const orders = await dbUtils.getItemByField(Order, user.role === "admin" ? {} : { userId: user._id });
		res.json(orders);
	} catch (err) {
		console.log(err);
		res.json({ err });
	}
});

/* Post and order. */
router.post("/", async function (req, res) {
	const newOrder = req.body;
	try {
		const order = await dbUtils.addItem(Order, newOrder);
		rabbitTaskSender.addTask(order, rabbitHost, orderGenerationQueue);
		res.json(order);
	} catch (err) {
		console.log(err);
		res.json({ err });
	}
});

/* Modify order. */
router.put("/:orderId", async function (req, res) {
	const newOrder = req.body;
	const orderId = req.params.orderId;
	const user = res.locals.userData;
	if (user.role !== "admin")
		return res.status(403).json({ error: "user does not have admin right" });
	try {
		const order = await dbUtils.updateItemById(Order, orderId, newOrder);
		rabbitTaskSender.addTask(order, rabbitHost, orderGenerationQueue);
		res.json(order);
	} catch (err) {
		console.log(err);
		res.json({ err });
	}
});

module.exports = router;
