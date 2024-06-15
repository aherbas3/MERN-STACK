const express = require('express')
const Workout = require('../models/workoutModel')
const {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController')

//CREATE A ROUTER
const router = express.Router()

//ADD REQUEST HANDLERS TO ROUTER
//GET all workouts
router.get('/', getWorkouts)

//GET a single workout
router.get('/:id', getWorkout)

//POST a new workout
router.post('/', createWorkout)

//DELETE a workout
router.delete('/:id', deleteWorkout)

//UPDATE a workout
router.patch('/:id', updateWorkout)



//EXPORT ROUTER
module.exports = router