const eventModel = require("../models/eventModel");

// Create event
const createEvent = async (req, res) => {
    try {
        const { title, date, location, description } = req.body;
        
        // Create new event with pending status
        const newEvent = new eventModel({
            title,
            date,
            location,
            description,
            userId: req.body.userId,
            status: 'pending'
        });

        await newEvent.save();
        res.status(201).send({
            success: true,
            message: "Event created successfully, waiting for admin approval",
            data: newEvent
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in creating event",
            error
        });
    }
};

// Get all approved events (for public view)
const getAllEvents = async (req, res) => {
    try {
        const events = await eventModel.find({ status: 'approved' });
        res.status(200).send({
            success: true,
            data: events
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in getting events",
            error
        });
    }
};

// Get all events (for admin)
const getAllEventsAdmin = async (req, res) => {
    try {
        const events = await eventModel.find({}).populate('userId', 'name email');
        res.status(200).send({
            success: true,
            data: events
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in getting events",
            error
        });
    }
};

// Approve event
const approveEvent = async (req, res) => {
    try {
        const event = await eventModel.findByIdAndUpdate(
            req.params.id,
            { status: 'approved' },
            { new: true }
        );
        res.status(200).send({
            success: true,
            message: "Event approved successfully",
            data: event
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in approving event",
            error
        });
    }
};

// Reject event
const rejectEvent = async (req, res) => {
    try {
        const event = await eventModel.findByIdAndUpdate(
            req.params.id,
            { status: 'rejected' },
            { new: true }
        );
        res.status(200).send({
            success: true,
            message: "Event rejected successfully",
            data: event
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in rejecting event",
            error
        });
    }
};

module.exports = {
    createEvent,
    getAllEvents,
    getAllEventsAdmin,
    approveEvent,
    rejectEvent
}; 