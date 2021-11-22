const express = require("express");
const router = express.Router();

const authRouter = require("./auth");
const orderRouter = require("./order");
const userRouter = require("./user");
const sandwichRouter = require("./sandwich");

const auth = require("../services/authService");
const authWithToken = auth.authWithToken;
const authWithBasic = auth.authWithBasic;

router.use("/auth", authWithBasic, authRouter);

router.use("/api/", authWithToken);
router.use("/api/order/", orderRouter);
router.use("/api/user/", userRouter);
router.use("/api/sandwich/", sandwichRouter);
router.use("*", (req, res) =>
	res.status(404).json({ error: "PAGE NOT FOUND" })
);

module.exports = router;
