import {useState} from "react"

const WorkoutForm = () => {
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)

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
            console.log('Response:', response);
            console.log('JSON:', json);

        if (!response.ok) {
            console.error('Error:', json);
            setError(json.error || 'Something went wrong');
        }

        if (response.ok) {
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            console.log('new workout added', json)
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
            />

            <label>Load in Kg:</label>
            <input
                type="number"
                //when user types in field, we'll take the field's value
                onChange={(e)=>setLoad(e.target.value)}
                //dafault input
                value={load}
            />

            <label>Reps:</label>
            <input
                type="number"
                //when user types in field, we'll take the field's value
                onChange={(e)=>setReps(e.target.value)}
                //dafault input
                value={reps}
            />

            <button type="submit">Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutForm