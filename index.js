const express = require('express')
const app = express();


// Express allows us to send http methods
// app.get, app.post, app.delete
// https://expressjs.com/en/4x/api.html

app.get('/', (req, res) => {
    console.log("Request recieved")
    res.send('Hello World');
});

app.get('/api/v1/addresses', (req, res) => {
    console.log("/api/v1/addresses recieved request");
    res.send([1, 2, 3, 4, 5]);
});

// Environment variable for port
const port = process.env.PORT || 8080;
app.listen(port, () => console.log('Listening on port:', port));