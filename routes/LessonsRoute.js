const express = require('express')
const Lesson = require('../model/Lessons')

const router = express.Router()

//Limit word check func
const strLimit = (str, limit) => {
    let L = str.split(" ")
    for (const word of L) {
        if (word.length > limit) return true
    }
    return false
}



// Servers call methods
/*--------------------*/

// Gets the List of all Tora lessons
router.get('/', (req, res) => {
    Lesson.find({}).exec((err, lessons) => {
        if (err) {
            res.status(404)
            res.send(`Error getting lessons list...`)
        }
        else {
            res.json(lessons)
            res.status(200)
        }
    })

})


// Get input (Torah Lesson) from user & add it to lessons.json file (List)
router.post('/addLesson', (req, res) => {

    let newLesson = new Lesson()
    newLesson.id = req.body.id
    newLesson.rebiName = req.body.rebiName
    newLesson.topic = req.body.topic
    newLesson.address = req.body.address
    newLesson.dateTime = req.body.dateTime

    newLesson.save((err, lesson) => {
        if (err) {
            res.status(404)
            res.send(`Failed adding lesson to the list...`)
        }
        else {
            res.status(201)
            res.send(`New lesson was added successfully`)
        }
    })
})


//Updates for every DataMember -> using params `:X`
router.put('/updateLesson/RN/:id', (req, res) => {

    let rqstBdy = req.body.newRebiName

    if (strLimit(rqstBdy, 10)) {
        res.status(400)
        res.send("Word Limit Exceeded...(10ChrMax)")
        return;
    }

    Lesson.findOneAndUpdate(
        { id: req.params.id }, { $set: { rebiName: rqstBdy } },
        (err, updatedRebiName) => {
            if (err || updatedRebiName === null || updatedRebiName === "") {
                res.status(404)
                res.send(`Failed updating Lessons rebi's name...`)
                return;
            }
            else {
                res.status(200)
                res.send(`Lessons rebi's name was updated successfully`)
            }
        }
    )
})

router.put('/updateLesson/T/:id', (req, res) => {

    let rqstBdy = req.body.newTopic

    if (strLimit(rqstBdy, 10)) {
        res.status(400)
        res.send("Word Limit Exceeded...(10ChrMax)")
        return;
    }

    Lesson.findOneAndUpdate(
        { id: req.params.id }, { $set: { topic: rqstBdy } },
        (err, updatedTopic) => {
            if (err || updatedTopic === null || updatedTopic === "") {
                res.status(404)
                res.send(`Failed updating Lessons Topic...`)
                return;
            }
            else {
                res.status(200)
                res.send(`Lessons Topic was updated successfully`)
            }
        }
    )
})

router.put('/updateLesson/Ad/:id', (req, res) => {


    let rqstBdy = req.body.newAddress

    if (rqstBdy == '') {
        res.send({ msg: "Must fill in this field..." })
        return;
    }
    if (strLimit(rqstBdy, 20)) {
        res.status(400)
        res.send("Word Limit Exceeded...(10ChrMax)")
        return;
    }

    Lesson.findOneAndUpdate(
        { id: req.params.id }, { $set: { address: rqstBdy } },
        (err, updatedAddress) => {
            if (err || updatedAddress === null || updatedAddress === "") {
                res.status(404)
                res.send(`Failed updating Lessons address...`)
                return;
            }
            else {
                res.status(200)
                res.send(`Lessons address was updated successfully`)
            }
        }
    )
})

router.put('/updateLesson/DT/:id', (req, res) => {


    let rqstBdy = req.body.newDateTime

    if (strLimit(rqstBdy, 20)) {
        res.status(400)
        res.send("Word Limit Exceeded...(10ChrMax)")
        return;
    }

    Lesson.findOneAndUpdate(
        { id: req.params.id }, { $set: { dateTime: rqstBdy } },
        (err, updatedSateTime) => {
            if (err || updatedSateTime === null || updatedSateTime === "") {
                res.status(404)
                res.send(`Failed updating Lessons dateTime...`)
                return;
            }
            else {
                res.status(200)
                res.send(`Lessons dateTime was updated successfully`)
            }
        }
    )
})


// Delete entry (lesson) details by given id 
router.delete('/deleteLesson/:id', (req, res) => {

    Lesson.findOneAndDelete({ id: req.params.id }).exec((err, lesson) => {
        if (err) {
            res.status(404)
            res.send(`Failed deleting lesson...`)
        }
        else {
            res.status(200)
            res.send(`Lesson was deleted successfully`)
        }
    })
})


module.exports = router