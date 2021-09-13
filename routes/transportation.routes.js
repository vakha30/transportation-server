const { Router } = require("express");
const { check } = require("express-validator");
const TransportationController = require("../controllers/transportationController");

const authMiddleware = require("../middlewares/auth.meddleware");

const router = Router();

router.post("/add", authMiddleware, TransportationController.addTransportation);

router.get("/", authMiddleware, TransportationController.getTransportation);

module.exports = router;
