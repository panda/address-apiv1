const Joi = require('joi'); // Pascal for classes
const express = require('express');
const app = express();

app.use(express.json()); //using expresses built in middleware for requests

const data = require('./data/address.json');
const { valid } = require('joi');
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
// return all matching strings from query
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
        zip: req.body.zip
    };

    // object destruct
    const { error } = validateAddress(req.body)

    if (error) {
        // 400 for bad request
        res.status(400).send(error.details[0].message);
        return;
    }

    data.push(address); // post data to list 
    res.send(address); // send request back to confirm    
});


// Modify addresses
app.put('/api/addresses/:line1', (req, res) => {
    // Look up the address
    // if not exist return 404
    const addresses = data.find(c => c.line1 === req.params.line1);
    if (!addresses) res.status(404).send('The address was not found'); // return 404

    // validate
    // if invalid return 400
    // object destruct
    const { error } = validateAddress(req.body)

    if (error) {
        // 400 for bad request
        res.status(400).send(error.details[0].message);
        return;
    }

    // update address
    const address = {
        line1: req.body.line1,
        line2: req.body.line2,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip
    };

    // return updated address
    res.send(address)
});

function validateAddress(address) {
    const schema = Joi.object({
        line1: Joi.string().required(),
        line2: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        zip: Joi.string().min(5).max(5).required(), // 33617 (5)
    });

    return schema.validate(address);

}

// Environment variable for port
const port = process.env.PORT || 8080;
app.listen(port, () => console.log('Listening on port:', port));
// console.log(data);