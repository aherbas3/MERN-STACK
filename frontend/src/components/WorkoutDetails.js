import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { formatDistanceToNow } from "date-fns/formatDistanceToNow"


//when mapping out workouts, we'd like to present the details in a standardized template
const WorkoutDetails = ({ workout, onEditClick}) => {
    const {dispatch} = useWorkoutsContext()

    const handleClickDel = async () => {
        const response = await fetch('/api/workouts/' + workout._id, {
            method: 'DELETE'
        })

        const json = await response.json()
        if (response.ok) {
            //sending the json of object we just deleting
            dispatch({type: 'DELETE_WORKOUT', payload: json})
        }
    }

    // to get an icon we add the class name to the element and then inside it we use a keyword for the icon we want.
    // the trash can icon keyword happens to be delete
    return (
        <div className="workoutDetails">
            <h4>{workout.title}</h4>
            <p><strong>Load: </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true})}</p>
            <span className="material-symbols-outlined del-icon" onClick={handleClickDel}>
                delete
            </span>
            <span className="material-symbols-outlined edit-icon" onClick={onEditClick}>
                edit
            </span>
        </div>
    )
}

export default WorkoutDetails