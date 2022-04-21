const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json()); //using expresses built in middleware for requests

const data = require('./data/address.json');
// Express allows us to send http methods
// app.get, app.post, app.delete
// https://expressjs.com/en/4x/api.html

app.get('/', (req, res) => {
    console.log("Request recieved");
    res.send('Hello World');
});

app.get('/api/v1/address', (req, res) => {
    console.log("[GET] /api/v1/address recieved request");
    res.send(data);
});

// ?/sortBy=name
// return all matching strings from query
// BUG: Return multiple finds
app.get('/api/v1/address/:line1', (req, res) => {
    console.log("[GET] /api/v1/address/:line1 recieved request");

    // adding a .filter() and a .includes() to refine the :line1
    const search = (text) => data.filter(({ line1 }) => line1.includes(text));

    const address = search(req.params.line1);

    console.log(address)
    if (!address) {
        return res.status(404).send('The address was not found'); // return 404 
    }
    
    res.send(address);
});

// Add address to list
/* 
{
        "line1": "184 Strawberry Street",
        "line2": "Suite 6100",
        "city": "Tampa",
        "state": "FL",
        "zip": "94107"
}
*/
app.post('/api/v1/address', (req, res) => {
    console.log("[POST] route interacted with");

    const addressBlob = {
        line1: req.body.line1,
        line2: req.body.line2,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip
    };

    // object destruct
    const { error } = validateAddress(req.body);

    if (error) {
        // 400 for bad request
        res.status(400).send(error.details[0].message);
        return;
    };

    data.push(addressBlob); // post data to list 
    res.send(addressBlob);
});


// Modify address
app.put('/api/v1/address/:line1', (req, res) => {
    console.log("[PUT] route has been reached")

    // Get JSON
    const address = data.find(
        a => a.line1 === req.params.line1,
        b => b.line2 === req.params.line2,
        c => c.city === req.params.city,
        d => d.state === req.params.state,
        e => e.zip === req.params.zip,
    );
    if (!address) {
        // I actually think if I didn't add return here, it would still execute the code, so adding ar return should stop it here if 404 occurs
        return res.status(404).send('The address was not found'); // return 404 
    }

    const addressBlob = {
        line1: req.body.line1,
        line2: req.body.line2,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip
    };

    // object destruct
    // Validate query aswell
    const { error } = validateAddress(addressBlob);

    if (error) {
        // 400 for bad request
        res.status(400).send(error.details[0].message);
        return;
    };

    // push to data and respond to client
    data.push(addressBlob); // post data to list 
    res.send(addressBlob); // send request back to confirm    

});

// delete object
app.delete('/api/v1/address/:line1', (req, res) => {
    console.log("[DELETE] route has been reached");

    // Get JSON
    const address = data.find(
        a => a.line1 === req.params.line1,
    );

    if (!address) {
        // I actually think if I didn't add return here, it would still execute the code, so adding ar return should stop it here if 404 occurs
        return res.status(404).send('The address was not found'); // return 404 
    }
    // index address
    const index = data.indexOf(address);
    data.splice(index, 1)

    // respond to clients
    res.send(address)

});

// https://joi.dev/api/?v=17.6.0
// Used for validation
// ex: zip code must be 5 char long (since data/address.json stores it as a string instead of int)
function validateAddress(address) {
    const schema = Joi.object({
        line1: Joi.string().required(),
        line2: Joi.string(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        zip: Joi.string().min(5).max(5).required(), // 33617 (5)
    });

    return schema.validate(address);

};

// Environment variable for port
const port = process.env.PORT || 8080;
app.listen(port, () => console.log('Listening on port:', port));
// console.log(data);