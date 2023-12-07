const sequelize = require('../util/database');
const {Sequelize, Datatypes} = require('sequelize');
const queryInterface = sequelize.getQueryInterface();
const User = require('../models/user');
const Expenses = require('../models/expense');
const Report = require('../models/report');
const multer = require('multer');

const AWS = require('aws-sdk');
AWS.config.update( {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region:process.env.AWS_REGION
});
const s3 = new AWS.S3();

exports.getLeaderBoardDetails = async (req, res, next) => {
    try {
        const users = await User.findAll( {
            attributes: ['id', 'firstName', 'lastName',  'totalExpense'
        ],
        order: [['totalExpense', 'ASC']],
        order:[ [sequelize.literal('totalExpense'), 'ASC'] ]
        } )
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'});
    }
};

exports.generateReport = async (req, res, next )=> {
    console.log('atleast working');
    console.log(req.file);
    try {
        if (!req.file || Object.keys(req.file).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }
        const uploadedFile = req.file;
        console.log(uploadedFile);
        console.log('So far so good');
        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: `${req.body.fileName}.csv`,
            ACL: 'public-read',
            Body: req.file.buffer
        };
        console.log(params);
        const data = await s3.upload(params).promise();

        const reportObj = {
            fileName: req.body.fileName,
            url: data.Location,
            UserId: req.body.userId
        } 

        const report  = await Report.create(  {fileName, url, UserId} = reportObj );
        res.status(200).json({
            url: data.Location,
            fileName: report.fileName,
            generatedDate: report.createdAt 
        });
        console.log('File uploaded successfully:', data.Location);
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'});
    }
};

exports.getAllReports = async (req, res, next ) => {
    try {
        const userId = req.body.userId; // Assuming the user ID is available in the request

        // Fetch all reports for the user from the database
        const reports = await Report.findAll({
            where: {
                UserId: userId
            }
        });

        // Modify the fetched data to fit the frontend's expected format if needed
        const formattedReports = reports.map(report => ({
            fileName: report.fileName,
            generatedDate: report.generatedDate, // Replace with actual date field
            url: report.url
        }));

        // Send the formatted reports to the frontend
        res.status(200).json(formattedReports);
    } catch (error) {
        console.log(error)
    }
};