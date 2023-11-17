const Customer = require('../models/customer');
const User = require('../models/customer');

exports.getBooking = async (req, res, next) => {
    try {
        console.log(req.body);
        res.sendFile('../public/index.html');
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
};

exports.getBookingByID = async (req, res, next) => {
    try {
        console.log(req.body);
        const bookingId = req.params.id;
        const booking = await Customer.findByPk(bookingId);
        if(!booking) {
            return res.status(404).send('Booking not Found');
        }
        res.json(booking);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
};

exports.getAllBooking = async (req, res, next) => {
    try {
        console.log(req.body);
        const bookings = await Customer.findAll();
        res.json(bookings);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
};

exports.addBooking = async (req, res, next) => {
    try {
        console.log(req.body);
        const newBooking = await Customer.create({
            firstName: req.body.firstName,
            secondName: req.body.secondName,
            email: req.body.email,
            gender: req.body.gender,
            age: req.body.age
        });
        res.redirect("/");
        const responseData = {
            id: newBooking.id
        }
        res.status(201).json(responseData);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
};

exports.updateBooking = async (req, res, next) => {
    try {
        console.log(req.body);
        const bookingId = req.params.id;
        const bookingToUpdate = await Customer.findByPk(bookingId);
        if(!bookingToUpdate) {
            return res.status(404).send('Booking not found');
        }
        await bookingToUpdate.update( {
            firstName: req.body.firstName,
            secondName: req.body.secondName,
            email: req.body.email,
            gender: req.body.gender,
            age: req.body.age
        } );
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
};

exports.deleteBooking = async (req, res, send) => {
    try {
        console.log(req.body);
        const bookingId = req.params.id;
        const bookingToDelete = await Customer.findByPk(bookingId);
        if(!bookingId) {
            return res.status(404).send('Booking not found');
        }
        await bookingToDelete.destroy();
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
};

