import {useState, useEffect} from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

const WorkoutForm = () => {
    const {dispatch} = useWorkoutsContext()

    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        //prevent the page from being refreshed when form is submitted
        e.preventDefault()

        const workout = {title, load, reps}

        //fetch a post request
        const response = await fetch('/api/workouts',  {
            method: 'POST', 
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if (!response.ok) {
            console.error('Error:', json);
            setEmptyFields(json.emptyFields || [])
            setError(json.error); 
        }

        if (response.ok) {
            setEmptyFields([])
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            console.log('new workout added', json)
            // when adding new workout, we don't have to refresh screen to see it anymore because we used workoutContext to update the global state
            // whenever the db is initially rendered, and so we just have to use that here too but now the type of the object we pass to dispatch will
            // be the create_workout type. this will update the global context accordingly and once again keep the ui in sync with the db
            dispatch({type: 'CREATE_WORKOUT', payload: json})
        }

    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

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

            <button type="submit">Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutForm