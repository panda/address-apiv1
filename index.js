const express = require('express')
const app = express();

const data = require('./data/address.json')
// Express allows us to send http methods
// app.get, app.post, app.delete
// https://expressjs.com/en/4x/api.html

app.get('/', (req, res) => {
    console.log("Request recieved")
    res.send('Hello World');
});

app.get('/api/v1/addresses', (req, res) => {
    console.log("/api/v1/addresses recieved request");
    res.send(data);
});

// ?/sortBy=name
app.get('/api/v1/addresses/:line1', (req, res) => {
    const addresses = data.find(c => c.line1 === req.params.line1);
    if (!addresses) res.status(404).send('The address was not found'); // return 404
    res.send(addresses);
});

// Environment variable for port
const port = process.env.PORT || 8080;
app.listen(port, () => console.log('Listening on port:', port));
console.log(data);