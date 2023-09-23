const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');

const config = require('./config/key');

const { User } = require("./models/User");
// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// application/json
app.use(bodyParser.json());

const mongoose = require("mongoose")
mongoose.connect(config.mongoURI).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))
app.get('/', (req, res) => {
  res.send('Hello World! - 안녕하세요~')
})

app.post('/register', (req, res) => {
    var messageModelObject = new User(req.body);

    messageModelObject.save()
        .then(() => {
            console.log("Message has been saved successfully in the database");
            console.log("This is a post request");
            console.log("Req body: ", req.body);
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log("There was an error saving the msg object to the database");
            console.log("Sending 500 status code");
            res.sendStatus(500);
        });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})