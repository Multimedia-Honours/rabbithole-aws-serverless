

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    const https = require('https');

    const data = JSON.stringify({
        createSource: {
            "avatar": "https://pbs.twimg.com/profile_images/825987046992814080/7VZkFQA9_400x400.jpg",
            "displayName": "Retro Communicator"
        },
        body: "This is a test message"
    });

    //recommend we make an AWS ryver account
    //Create channel and get retro peeps to use that, posts messages on forum/in teams

    const options = {
        hostname: 'reinhard.ryver.com',
        path: '/api/1/odata.svc/forums(1560158)/Chat.PostMessage()',
        // port: 8080,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer uat-9d881bb6b3c073d6c3dcc04383c0b50720175d48'
        }
    };


    const req = https.request(options, (res) => {
        let data = '';

        console.log('Status Code:', res.statusCode);

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            console.log('Body: ', JSON.parse(data));
        });

    }).on("error", (err) => {
        console.log("Error: ", err.message);
    });

    req.write(data);
    req.end();
    
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
