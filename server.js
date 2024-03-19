const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// MongoDB connection URI
const mongoURI = 'mongodb+srv://athv:<albert@123>@cluster0.fqmpkrn.mongodb.net/';
const dbName = 'your_database_name';

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
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
