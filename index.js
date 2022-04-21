const express = require('express')
const app = express();

app.use(express.json()); //using expresses built in middleware for requests

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

// Add addresses to list
/* 
{
        "line1": "184 Strawberry Street",
        "line2": "Suite 6100",
        "city": "Tampa",
        "state": "FL",
        "zip": "94107"
}
*/
app.post('/api/v1/addresses', (req, res) => {
    console.log("post route interacted with");
    const address = {
        line1: req.body.line1,
        line2: req.body.line2,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
    };
    data.push(address); // post data to list 
    res.send(data); // send request back to confirm
});

// Environment variable for port
const port = process.env.PORT || 8080;
app.listen(port, () => console.log('Listening on port:', port));
console.log(data);