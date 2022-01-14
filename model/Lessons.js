const mongoose = require('mongoose')
const { stringify } = require('nodemon/lib/utils')

let LessonsSchema = new mongoose.Schema(
    {
        id: Number,
        rebiName: String,
        topic: String,
        address: String,
        dateTime: String
    },
    {
        strict: false
    }
)

const LessonsModel = mongoose.model("LessonsSchema", LessonsSchema)

module.exports = LessonsModel
