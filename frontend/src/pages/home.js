import {useEffect, useState} from 'react'

//components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const Home = () => {
    // states
    // initial state is null
    const[workouts, setWorkouts] = useState(null)

    useEffect(() => {
        const fetchWorkouts = async () => {
            // fetch data from api using this request url and store response in this object
            const response = await fetch('/api/workouts')
            // pass json from response object into this object
            // it now holds an array of workout objects
            const json = await response.json()

            if (response.ok) {
                // if response has no errors
                setWorkouts(json)
            }
        }

        fetchWorkouts()
    }, [])

    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout)=>(
                //only if we have a value for workouts we'll start mapping through them
                // as a prop we'll pass in the workout object
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </div>
            <WorkoutForm/>
        </div>
    )
}

export default Home