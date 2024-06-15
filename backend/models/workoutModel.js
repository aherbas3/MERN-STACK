//it's mongoose who allows us to create these models and schemas
const mongoose = require('mongoose')

//CREATE SCHEMA
const Schema = mongoose.Schema

//CREATE SPECIFIC SCHEMA
// first arg descs how obj looks
// second arg auto adds 2 props telling when a doc was created and updated
const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    }
}, {timestamps:true})

//CREATE MODEL
// workout will be pluralized to create a workouts collection automatically in the db
module.exports = mongoose.model('Workout', workoutSchema)