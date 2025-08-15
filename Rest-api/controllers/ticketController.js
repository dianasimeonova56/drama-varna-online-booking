const { ticketModel, bookingModel, playModel } = require('../models');

function getTickets(req, res, next) {
    ticketModel.find()
        .populate('userId')
        .then(tickets => res.json(tickets))
        .catch(next);
}

function getTicket(req, res, next) {
    const { ticketId } = req.params;

    ticketModel.findById(ticketId)
        .populate('userId')
        .then(ticket => {
            if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
            res.json(ticket);
        })
        .catch(next);
}

async function generateTicketsForBooking(bookingData) {

    try {
        const booking = await bookingModel.findById(bookingData._id);

        if (!booking) {
            //TODO not log but return error
            console.log("Booking not found!");
        }
        const play = await playModel.findById(bookingData.playId);

        const lastTicket = await ticketModel
            .findOne({ playId: booking.playId })
            .sort({ seat: -1 });

        const startSeat = lastTicket ? lastTicket.seat + 1 : 1;


        if (!play) {
            console.log("Play not found!");

        }
        const ticketsToCreate = [];

        for (let seatNum = startSeat; seatNum < startSeat + booking.seats; seatNum++) {
            ticketsToCreate.push({
                title: play.playName,
                date: play.playDate,
                place: play.place,
                seat: seatNum,
                userId: booking.userId,
                playId: booking.playId,
            });
        }

        const tickets = await ticketModel.insertMany(ticketsToCreate);

        return tickets;

    } catch (err) {
        console.log(err);

    }
}

function createTicket(req, res, next) {
    const { ticketData } = req.body;
    const { _id: userId } = req.user;

    ticketModel.create({ ...ticketData, userId })
        .then(ticket => res.status(201).json(ticket))
        .catch(next);
}

function editTicket(req, res, next) {
    const { ticketId } = req.params;
    const { ticketData } = req.body;

    // if the userId is not the same as this one of the post, the post will not be updated
    ticketModel.findByIdAndUpdate(ticketId, ticketData, { new: true })
        .then(updatedTicket => {
            if (updatedTicket) {
                res.status(200).json(updatedTicket);
            }
            else {
                res.status(401).json({ message: `Not allowed!` });
            }
        })
        .catch(next);
}

function deleteTicket(req, res, next) {
    const { ticketId } = req.params;

    ticketModel.findByIdAndDelete(ticketId)
        .then(deletedTicket => {
            if (deletedTicket) {
                res.status(200).json(deletedTicket);
            } else {
                res.status(404).json({ message: 'Ticket not found' });
            }
        })
        .catch(next);
}

module.exports = {
    getTickets,
    getTicket,
    generateTicketsForBooking,
    createTicket,
    editTicket,
    deleteTicket
}
