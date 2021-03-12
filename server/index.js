const express = require('express');
const axios = require('axios');
const { apiKey } = require('../config.js');

const app = express();
const port = 3000;
const apiUrl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/';

app.use(express.static('public'));
app.use(express.json());

app.all('/api/*', (req, res) => {
  // req.method is what type we used
  // req.originalUrl is what we're targeting.

  // Take in the original request, filter off the /api portion,
  // make a new axios request using that type with an authorization token
  // to the appropriate URL, send back the information we obtain in the response.
  const targetUrl = apiUrl + req.originalUrl.slice(5);
  debugger;
  axios({
    method: req.method,
    url: targetUrl,
    headers: { authorization: apiKey },
    data: req.body,
  })
    .then((data) => {
      res.send(data.data);
    })
    .catch((e) => {
      res.send(e);
    });
});

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
