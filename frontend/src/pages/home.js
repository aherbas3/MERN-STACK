import {useEffect, useState} from 'react'

//components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'
import EditForm from '../components/EditForm'

import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

const Home = () => {
    const [editing, setEditing] = useState(false)
    const [editWorkout, setEditWorkout] = useState(null); //workout we're editing
    const {workouts, dispatch} = useWorkoutsContext()

    useEffect(() => {
        const fetchWorkouts = async () => {
            // fetch data from api using this request url and store response in this object
            const response = await fetch('/api/workouts')
            // pass json from response object into this object
            // it now holds an array of workout objects
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }

        fetchWorkouts()
    }, [dispatch])

    const handleEditClick = (workout) => {
        setEditing(true); // Set editing state to true
        setEditWorkout(workout); // Set the specific workout data for editing
    };

    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout)=>(
                //only if we have a value for workouts we'll start mapping through them
                // as a prop we'll pass in the workout object
                    <WorkoutDetails key={workout._id} workout={workout} onEditClick={() => handleEditClick(workout)}/>
                ))}
            </div>
            
            {editing ? (
                <EditForm workout={editWorkout} setEditing={setEditing}/>
            ) : (
                <WorkoutForm />
            )}
        </div>
    )
}

export default Home