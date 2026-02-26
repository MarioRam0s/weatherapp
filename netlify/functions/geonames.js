const fetch = require("node-fetch");

exports.handler = async function (event) {
  const { postalcode, country } = event.queryStringParameters;

  const url = `http://api.geonames.org/postalCodeLookupJSON?postalcode=${postalcode}&country=${country}&username=lorddev`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error fetching data" }),
    };
  }
};