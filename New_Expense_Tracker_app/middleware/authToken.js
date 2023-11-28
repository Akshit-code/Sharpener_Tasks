const jwt = require('jsonwebtoken');

exports.authToken = async (req, res, next) => {
    const secretKey = process.env.SECRET_KEY;
    let token = req.headers['authorization'];
    token = token.split(' ')[1];
    console.log("From AuthToken Key: ", secretKey);
    console.log("From AuthToken Key: ", token);


    const decode = jwt.verify(token, secretKey);
    console.log(" Decoded ",decode);
    req.body.email = decode.email;
    console.log( "From AuthToken Body",req.body);
    next();
};
