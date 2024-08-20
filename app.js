const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { configDotenv } = require('dotenv');
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect('mongodb+srv://jaindevshrut:qhfcsmwOL5AiXAoQ@cluster0.7ou0r.mongodb.net/Cluster0?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('Mongoose Connected');
    }).catch(e => {
        console.error("Mongoose Not Connected", e);
    });

const static_path = path.join(__dirname, "/");

app.use(express.static(static_path));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/submit', (req, res) => {
    res.sendFile(path.join(__dirname, 'submit.html'));
});

const newSchema = new mongoose.Schema({
    name: String,
    email: String,
    number: Number,
    country: String,
    jobTitle: String,
    message: String
});

const application = mongoose.model("Register", newSchema);

app.post("/submit", async (req, res) => {
    console.log(req.body);
    const { name, email, number, country, jobTitle, message } = req.body;
    const newData = new application({
        name: name,
        email: email,
        number: number,
        country: country,
        jobTitle: jobTitle,
        message: message
    });
    try {
        await newData.save();
        res.redirect('/');
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
