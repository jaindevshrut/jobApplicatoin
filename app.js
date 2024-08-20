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



const multer = require('multer');
const fs = require('fs');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = './uploads';
        if (!fs.existsSync(uploadDir)){
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });






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
    message: String,
    cv : {
        type : String,
        require : true
    }
});

const application = mongoose.model("Register", newSchema);

app.post("/submit", upload.single('cv'), async (req, res) => {
    const { name, email, number, country, jobTitle, message } = req.body;
    const cvPath = req.file.path; // Path to the uploaded file
    
    const newData = new application({
        name: name,
        email: email,
        number: number,
        country: country,
        jobTitle: jobTitle,
        message: message,
        cv: cvPath
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
