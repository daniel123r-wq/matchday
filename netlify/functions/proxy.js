exports.handler = async function(event, context) {
  try {
    // Sicherer Zugriff auf Query-Parameter, um Abstürze zu verhindern
    const endpoint = event.queryStringParameters?.endpoint;
    if (!endpoint) {
      return { 
        statusCode: 400, 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Missing endpoint parameter" }) 
      };
    }

    const apiKey = process.env.FOOTBALL_DATA_API_KEY;
    if (!apiKey) {
      return { 
        statusCode: 500, 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "FOOTBALL_DATA_API_KEY is not set in environment variables" }) 
      };
    }

    const targetUrl = `https://api.football-data.org/v4/${endpoint}`;
    
    const response = await fetch(targetUrl, {
      headers: { 'X-Auth-Token': apiKey }
    });
    
    const data = await response.json();

    return {
      statusCode: response.status,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error("Proxy execution error:", error);
    return { 
      statusCode: 500, 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: error.toString() }) 
    };
  }
};
