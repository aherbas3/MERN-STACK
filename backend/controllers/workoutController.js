const Workout = require('../models/workoutModel')
const mongoose=require('mongoose')
//get all workouts
const getWorkouts = async (req, res) => {
    //get all workouts in workout collection as an array. sort by newest ones at top
    //if we wanted only the ones with 20 reps, inside {} write reps: 20
    const workouts = await Workout.find({}).sort({createdAt: -1})

    //return array of workout docs as json to the browser
    res.status(200).json(workouts)
}
//get a single workout
const getWorkout = async (req,res) => {
    //all route params are stored in params property
    //destructuring. we're grabbing the id property specifically
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        //if the id we pass in is not valid
        //we need this bc otherwise if we give ids that aren't the right format, we'll have an internal error that will lead to crashes
        return res.status(404).json({error: 'no such workout'})
    }
    const workout = await Workout.findById(id)

    if (!workout) {
        //if the id is valid but we cant find it
        return res.status(404).json({error: 'no such workout'})
    }

    res.status(200).json(workout)
}

//create new workout
const createWorkout = async (req, res) => {
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
}
//delete a workout

//update a workout


module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout
}