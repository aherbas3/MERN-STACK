import {useState, useEffect} from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

const EditForm = ({workout, setEditing}) => {
    const {dispatch} = useWorkoutsContext()

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
        
    }

    const handleCancel = async () => {
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