const express = require('express')
const Workout = require('../models/workoutModel')

//CREATE A ROUTER
const router = express.Router()

//ADD REQUEST HANDLERS TO ROUTER
//GET all workouts
router.get('/', (req, res) => {
    res.json({mssg: 'GET all workouts'})
})

//GET a single workout
router.get('/:id', (req, res) => {
    res.json({mssg: 'GET a single workout'})
})

//POST a new workout
// workout.create is asynch, so made whole method asynch
router.post('/', async (req, res) => {
    //parse info from req
    const {title, load, reps} = req.body
    try {
        //create a doc using parsed info, store doc and id in the const
        const workout = await Workout.create({title, load, reps})
        //send response w status code and json of workout object/doc we got back
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

//DELETE a workout
router.delete('/:id', (req, res) => {
    res.json({mssg: 'DELETE a workout'})
})

//UPDATE a workout
router.patch('/:id', (req, res) => {
    res.json({mssg: 'UPDATE a workout'})
})



//EXPORT ROUTER
module.exports = router