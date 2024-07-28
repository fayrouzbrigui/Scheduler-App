const eventService = require("../services/event");

exports.getEvents = async (req, res) => {
    try {
        const events = await eventService.getEvents(req.user.id);
        res.json(events);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.addEvent = async (req, res) => {
    try {
        const event = await eventService.addEvent(req.user.id, req.body);
        res.status(201).json(event);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateEvent = async (req, res) => {
    try {
        const event = await eventService.updateEvent(req.params.id, req.body);
        res.json(event);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        const result = await eventService.deleteEvent(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};