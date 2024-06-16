//when mapping out workouts, we'd like to present the details in a standardized template
const WorkoutDetails = ({ workout}) => {
    return (
        <div className="workoutDetails">
            <h4>{workout.title}</h4>
            <p><strong>Load: </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{workout.createdAt}</p>
        </div>
    )
}

export default WorkoutDetails