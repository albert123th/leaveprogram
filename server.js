const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// MongoDB connection URI
const mongoURI = 'https://script.google.com/macros/s/AKfycbweQS8rhUqj_rAI4Xwj77qY-7swfxL5SuBFyEKotfPVnNvh01gXtJh_EDuc1DJqjorr/execection_uri';
const dbName = 'userdata';

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/registrationform.html');
});

app.post('/login', (req, res) => {
    const username = req.body.user;
    const password = req.body.password;

    MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
        if (err) {
            console.error('Error connecting to MongoDB:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        const db = client.db(dbName);
        const usersCollection = db.collection('users');

        usersCollection.findOne({ username, password }, (err, user) => {
            if (err) {
                console.error('Error querying database:', err);
                res.status(500).send('Internal Server Error');
                return;
            }

            if (user) {
                res.send('Login successful!');
            } else {
                res.send('Invalid username or password');
            }

            client.close();
        });
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
