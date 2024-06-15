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
const deleteWorkout = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        //if the id we pass in is not valid
        //we need this bc otherwise if we give ids that aren't the right format, we'll have an internal error that will lead to crashes
        return res.status(404).json({error: 'no such workout'})
    }

    //delete it. find the object whose _id property is same as our id const
    // this const now holds the data of the workout we deleted
    const workout = await Workout.findOneAndDelete({_id: id})

    if (!workout) {
        //if the id is valid but we cant find it
        return res.status(400).json({error: 'no such workout'})
    }

    //else, we return the json of the workout we deleted
    res.status(200).json(workout)
}

//update a workout
const updateWorkout = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        //if the id we pass in is not valid
        //we need this bc otherwise if we give ids that aren't the right format, we'll have an internal error that will lead to crashes
        return res.status(404).json({error: 'no such workout'})
    }

    //first arg is find criteria, second is an object representing update to make
    //... is spreading all the properties of req.body into a new object
    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!workout) {
        //if the id is valid but we cant find it
        return res.status(400).json({error: 'no such workout'})
    }

    //if found, send json of orig workout that was updated
    res.status(200).json(workout)
}


module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}