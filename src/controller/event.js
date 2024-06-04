const eventModel = require("../model/event");

const addEvent = async (req, res) => {
    try {
        const { eventName, date, time, venue, available_tickets } = req.body;
        const data = await eventModel.create({
            eventName,
            date,
            time,
            venue,
            available_tickets
        })
        return res.status(201).json({ message: "Event created successfully", data });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}


const eventList = async (req, res) => {
    try {
        const data = await eventModel.find();
        return res.status(200).json({ message: "Event List Fetched Successfully", data });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const getEvnetById = async (req, res) => {
    try {
        const data = await eventModel.find({ _id: req.params.id });
        return res.status(200).json({ message: "Event Fetched Successfully", data });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = { addEvent, getEvnetById, eventList };



