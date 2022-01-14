// IMPORTS:
const express = require('express')
const mongoose = require('mongoose')
const lessons = require("./routes/LessonsRoute")
const cors = require('cors')

// SERVER SETUP:
const app = express();
const PORT = 3000;

// use it before all route definitions
app.use(cors())

// For POST & PUT requests (get the body from request).
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/TorahLessons', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// Sends the Root of the website `localhost:XXXX/`- HomePage
app.use("/", express.static("public"))

app.use('/lessons', lessons)

// Listening to client requests & sends message to console
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}...`))