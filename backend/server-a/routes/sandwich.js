const express = require("express");
const router = express.Router();

const dbUtils = require("../utils/dbUtils");
const Sandwich = require("../models/sandwich");
const defaultSandwich = require("../data/sandwich");

dbUtils.resetItems(Sandwich, defaultSandwich);
/* GET sandwich by id. */
router.get("/:sandwichId", async function (req, res) {
	const sandwichId = req.params.sandwichId;
	try {
		const sandwich = await dbUtils.getItemById(Sandwich, sandwichId);
		res.json(sandwich);
	} catch (err) {
		console.log(err);
		res.json({ err });
	}
});

/* GET all sandwichs. */
router.get("/", async function (req, res) {
	try {
		const sandwiches = await dbUtils.getItemByField(Sandwich, {});
		res.json(sandwiches);
	} catch (err) {
		console.log(err);
		res.json({ err });
	}
});

/* load test sandwich. */
router.post("/reset", async function (req, res) {
	try {
		const sandwich = await dbUtils.resetItems(Sandwich, defaultSandwich);
		res.json(sandwich);
	} catch (err) {
		console.log(err);
		res.json({ err });
	}
});

/* PUT update sandwich by id. */
router.put("/:sandwichId", async function (req, res) {
	const sandwichId = req.params.sandwichId;
	const newSandwich = req.body;
	try {
		const sandwich = await dbUtils.updateItemById(
			Sandwich,
			sandwichId,
			newSandwich
		);
		res.json(sandwich);
	} catch (err) {
		console.log(err);
		res.json({ err });
	}
});

/* Post a sandwich. */
router.post("/", async function (req, res) {
	const newSandwich = req.body;
	try {
		const sandwich = await dbUtils.addItem(Sandwich, newSandwich);
		res.json(sandwich);
	} catch (err) {
		console.log(err);
		res.json({ err });
	}
});

/* DELETE sandwich by id. */
router.delete("/:sandwichId", async function (req, res) {
	const sandwichId = req.params.sandwichId;
	try {
		const sandwich = await dbUtils.deleteItemById(Sandwich, sandwichId);
		res.json(sandwich);
	} catch (err) {
		console.log(err);
		res.json({ err });
	}
});

module.exports = router;
