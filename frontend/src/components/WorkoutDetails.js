import { useWorkoutsContext } from "../hooks/useWorkoutsContext"


//when mapping out workouts, we'd like to present the details in a standardized template
const WorkoutDetails = ({ workout}) => {
    const {dispatch} = useWorkoutsContext()

    const handleClick = async () => {
        const response = await fetch('/api/workouts/' + workout._id, {
            method: 'DELETE'
        })

        const json = await response.json()
        if (response.ok) {
            //sending the json of object we just deleting
            dispatch({type: 'DELETE_WORKOUT', payload: json})
        }
    }
    return (
        <div className="workoutDetails">
            <h4>{workout.title}</h4>
            <p><strong>Load: </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{workout.createdAt}</p>
            <span onClick={handleClick}>
                delete
            </span>
        </div>
    )
}

export default WorkoutDetails