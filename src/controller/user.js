const userModel = require("../model/user");
const eventModel = require("../model/event");
const userEventModel = require("../model/userEvent");
const jwt = require("jsonwebtoken");

const addUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        await userModel.create({ name, email, password });
        return res.status(201).json({ message: "user created successfully" });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const login = async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;
        const data = await userModel.find({ email });
        if (!data) {
            return res.staus(404).json({ message: "User not found" })
        }
        if (password != confirmPassword) {
            return res.status(400).json({ message: "Password doesn't match" });
        }
        const token = jwt.sign({data}, process.env.secretKey, { expiresIn: '3d' });
        return res.status(200).json({ message: "Login success", token })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const bookTicket = async (req, res) => {
    try {
        const { eventId, ticket_booked } = req.body;
        const { available_tickets } = await eventModel.findOne({ _id: eventId });
        if (available_tickets === 0) {
            return res.status(404).json({ message: "Sorry not seat available" });
        }
        if (available_tickets < ticket_booked) {
            return res.status(400).json({ message: `only ${available_tickets} are availabe` });
        }
        await userEventModel.create({
            user_id: req.userData,
            event_id: eventId,
            ticket_booked
        });
        await eventModel.findByIdAndUpdate({ _id: eventId }, {
            $set: {
                available_tickets: available_tickets - ticket_booked
            }
        });
        return res.status(201).json({ message: "Ticket Booked" });
    } catch (error) {
        console.log(error,"data")
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = { addUser, login, bookTicket }