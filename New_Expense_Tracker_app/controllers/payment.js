const Razorpay = require('razorpay');
const razorPayInstance = require('../util/razorPay');
const sequelize = require('../util/database');
const {Sequelize, Datatypes} = require('sequelize');
const queryInterface = sequelize.getQueryInterface();
const Orders = require('../models/orders');
const User = require('../models/user');

exports.createOrder = async (req, res, next) => {
    const options = {
        amount:1*100,
        currency:'INR',
    }
    razorPayInstance.orders.create(options, (err, order) => {
        if(err) {
            console.log(err);
            return res.status(500).json({message: 'Somthing went Wrong'});
        }
        order.razorPayId = process.env.RAZOR_ID;
        console.log("Data", order);
        res.status(200).json(order);
    })
};

exports.addOrder = async (req, res, next) => {
    console.log(req.body);
    const orderDetails = {
        amount: req.body.amount,
        payment_Id: req.body.response.razorpay_payment_id,
        order_Id: req.body.response.razorpay_order_id,
        signature: req.body.response.razorpay_signature, 
        UserId: req.body.userId 
    }

    const order = await Orders.create ( {
        amount, payment_Id, order_Id, signature,
    } = orderDetails );

    const isExistingUser = await User.findByPk(req.body.email);
    if (isExistingUser) {
        await isExistingUser.update({ isPremiumUser: true });
        res.status(200).json({ message: 'User upgraded to premium.' });
    } else {
        res.status(404).json({ message: 'User not found.' });
    }
    
}