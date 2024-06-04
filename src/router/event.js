const express = require("express");
const { addEvent, eventList, getEvnetById } = require("../controller/event");
const router = express.Router();

router.post("/addEvent", addEvent);

router.get("/eventList", eventList);

router.get("/eventId/:id", getEvnetById);

module.exports = router;
