const sequelize = require('../util/database');
const {Sequelize, Datatypes} = require('sequelize');
const queryInterface = sequelize.getQueryInterface();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const secretKey = process.env.SECRET_KEY;
const dotenv = require('dotenv');
const config = dotenv.config();
const SibApiV3Sdk = require('sib-api-v3-sdk');
let defaultClient = SibApiV3Sdk.ApiClient.instance;
let apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.SIB_KEY;

exports.register = async (req, res, next) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        req.body.id = req.body.email;
        req.body.password = hashPassword;
        const isExistingUser = await User.findByPk(req.body.email);

        if(!isExistingUser) {
            const user = await User.create(req.body);
            console.log("New User Added")
            console.log(req.body);
            return res.status(201).json(req.body);
        } else {
            console.log("User Already Exits");
            return res.status(200).json(req.body);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal Server Error');
    }
}

exports.login = async (req, res, next) =>  {
    try {
        const isExistingUser = await User.findByPk(req.body.email);
        if(isExistingUser) {
            const validPassword = await bcrypt.compare(req.body.password, isExistingUser.password);
            if(!validPassword) {
                console.log("Incorrect Password");
                return res.status(401).json({message: 'Incorrect Password'});
            };
            const token = jwt.sign({ email: req.body.email }, secretKey);
            const responsePayLoad = {
                isPremiumUser : isExistingUser.isPremiumUser,
                email : isExistingUser.email,
                token: token
            }
            console.log("User Logged In");
            return res.status(200).json(responsePayLoad);
        } else {
            console.log("No user found");
            return res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal Server Error');
    }
};

exports.forgotPasword = async (req, res, next) => {
    try {
        const userEmail = req.body.email;
        const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

        // Creating email details
        const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
        sendSmtpEmail.sender = { email: 'akshitmandani100@gmail.com', name: 'Akshit Mandani' }; // Replace with your email and name
        sendSmtpEmail.to = [{ email:userEmail }];
        sendSmtpEmail.htmlContent = `
            <html>
                <body>
                    <h1>Password Reset</h1>
                    <p>Hello User,</p>
                    <p>Click the link below to reset your password:</p>
                    <button> Rest Password </button>
                </body>
            </html>
        `;
        sendSmtpEmail.subject = 'Password Reset'; // Email subject

        // Send the email
        const sendSmtpEmailResponse = await apiInstance.sendTransacEmail(sendSmtpEmail, apiKey);
        console.log('Email sent successfully:', sendSmtpEmailResponse);

        res.status(200).json(req.body);
    } catch (error) {
        console.log(error);
    }
};