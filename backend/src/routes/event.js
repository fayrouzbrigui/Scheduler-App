const express = require("express");
const { getEvents, addEvent, deleteEvent, updateEvent } = require("../controllers/event");
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
    .get(protect, getEvents)  
    .post(protect, addEvent);

router.route('/:id')
    .delete(protect, deleteEvent)
    .put(protect, updateEvent);

module.exports = router;