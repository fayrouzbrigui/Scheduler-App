const Event = require("../models/event");
const mongoose = require("../configuration/dbConfig");

exports.getEvents = async (userId) => {
    try {
        return await Event.find({ user: userId });
    } catch (error) {
        throw new Error('Error fetching events');
    }
};

exports.addEvent = async (userId, eventData) => {
    const { title, description, date, importance } = eventData;
    try {
        const event = new Event({
            user: userId,
            title,
            description,
            date,
            importance,
        });
        return await event.save();
    } catch (error) {
        throw new Error('Error adding event');
    }
};

exports.updateEvent = async (eventId, eventData) => {
    const { title, description, date, importance } = eventData;
    try {
        const event = await Event.findById(eventId);
        if (event) {
            event.title = title || event.title;
            event.description = description || event.description;
            event.date = date || event.date;
            event.importance = importance || event.importance;
            return await event.save();
        } else {
            throw new Error('Event not found');
        }
    } catch (error) {
        throw new Error('Error updating event');
    }
};

exports.deleteEvent = async (eventId) => {
    try {
        // Check if the eventId is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(eventId)) {
            throw new Error('Invalid event ID');
        }

        // Find the event by ID
        const event = await Event.findById(eventId);
        if (event) {
            // Delete the event if it exists
            await event.deleteOne();
            return { message: 'Event removed' };
        } else {
            throw new Error('Event not found');
        }
    } catch (error) {
        console.error('Error deleting event:', error); // Log the error for debugging
        throw new Error('Error deleting event: ' + error.message); // Return detailed error message
    }
};