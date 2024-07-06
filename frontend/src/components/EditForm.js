import {useState} from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

const EditForm = ({workout, setEditing}) => {
    const {dispatch} = useWorkoutsContext()

    const id = workout._id
    const createdAt = workout.createdAt
    const [title, setTitle] = useState(workout.title)
    const [load, setLoad] = useState(workout.load)
    const [reps, setReps] = useState(workout.reps)
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const [action, setAction] = useState('')

    const handleSubmit = async (e) => {
        //prevent the page from being refreshed when form is submitted
        e.preventDefault()

        if (action === 'submit changes') {
            handleEdit()
        }

        if (action === 'cancel') {
            handleCancel()
        }
    }

    const handleEdit = async () => {
        const newWorkout = {id, title, load, reps, createdAt}

        if (newWorkout.title !== workout.title || newWorkout.load !== workout.load || newWorkout.reps !== workout.reps) {
                console.log("reached changes made")
                console.log("we're passing the api this newWorkout:", newWorkout)
                    //if we changed the orig values, we send the new values to the API via a patch request
                    const response = await fetch('/api/workouts/' + workout._id, {
                        method: 'PATCH',
                        body: JSON.stringify(newWorkout),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    
                    // should return the json of the original workout we edited
                    const json = await response.json()
                    
                    if (!response.ok) {
                        setEmptyFields(json.emptyFields || [])
                        setError(json.error);;
                        return;
                    }
            
                    if (response.ok) {
                        setEmptyFields([])
                        setTitle(newWorkout.title)
                        setLoad(newWorkout.load)
                        setReps(newWorkout.reps)
                        setError(null)
                        // when adding new workout, we don't have to refresh screen to see it anymore because we used workoutContext to update the global state
                        // whenever the db is initially rendered, and so we just have to use that here too but now the type of the object we pass to dispatch will
                        // be the create_workout type. this will update the global context accordingly and once again keep the ui in sync with the db
                        dispatch({type: 'EDIT_WORKOUT', payload: newWorkout})
                        setEditing(false);
                    }
        } else {
            console.log("no changes made")
            setEditing(false);
        }
    }

    const handleCancel = async () => {
        console.log("reached handleCancel")
        setEditing(false);
    }

    return (
        <form className="edit" onSubmit={handleSubmit}>
            <h3>Make Changes</h3>

            <label>Exercise Title:</label>
            <input
                type="text"
                //when user types in field, we'll take the field's value
                onChange={(e)=>setTitle(e.target.value)}
                //dafault input
                value={title}
                // we will give the input an error class if we have en empty title field, and no class if no error in title field
                // we'll apply the same changes to the other inputs
                className={(emptyFields.includes('title')) ? 'error' : ''}
            />

            <label>Load in Kg:</label>
            <input
                type="number"
                //when user types in field, we'll take the field's value
                onChange={(e)=>setLoad(e.target.value)}
                //dafault input
                value={load}
                className={(emptyFields.includes('load')) ? 'error' : ''}
            />

            <label>Reps:</label>
            <input
                type="number"
                //when user types in field, we'll take the field's value
                onChange={(e)=>setReps(e.target.value)}
                //dafault input
                value={reps}
                className={(emptyFields.includes('reps')) ? 'error' : ''}
            />

            <button type="submit" className="editBtn" onClick={() => setAction('submit changes')}>Submit Changes</button>
            <button type="submit" className="cancelBtn" onClick={() => setAction('cancel')}>Cancel</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default EditForm