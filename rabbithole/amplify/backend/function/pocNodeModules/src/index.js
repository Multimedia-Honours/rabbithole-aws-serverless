


/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

exports.handler = async (event) => {
const nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'testingNodeSender@gmail.com',
      pass: 'icC6P6vt'
    }
    });

    var mailOptions = {
    from: 'u17074292@tuks.co.za',
    to: 'devilliersmeiring.dm@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
    };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      return {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  }, 
        body: JSON.stringify('Hello from Lambda!'),
    }; 
    }
    }); 


    return {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  }, 
        body: JSON.stringify('Hello from Lambda!'),
    }; 
};
