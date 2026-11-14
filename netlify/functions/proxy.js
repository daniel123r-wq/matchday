const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    const endpoint = event.queryStringParameters.endpoint;
    if (!endpoint) {
        return { statusCode: 400, body: JSON.stringify({ error: "Missing endpoint" }) };
    }

    const apiKey = '77f515e3b145463f84cbb38ade409ce7';
    const targetUrl = `https://api.football-data.org/v4/${endpoint}`;

    try {
        const response = await fetch(targetUrl, {
            headers: { 'X-Auth-Token': apiKey }
        });
        const data = await response.json();

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.toString() }) };
    }
};