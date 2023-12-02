const Razorpay = require('razorpay');
const razorPayInstance = require('../util/razorPay');
const Orders = require('../models/orders');

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
    }

    const order = await Orders.create ( {
        amount, payment_Id, order_Id, signature,
    } = orderDetails )

    res.status(200).json(order);
}