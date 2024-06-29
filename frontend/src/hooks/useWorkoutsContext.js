import { WorkoutsContext } from "../context/WorkoutContext";
import { useContext} from "react";

//the way we can use workoutsContext is pretty easy. just use a built in hook called useContext and then specify which we want to use.
// However, we'll make our own hook.

export const useWorkoutsContext = () => {
    // this hook returns to us the value of workoutsContext, which is an object with state and dispatch
    const context = useContext(WorkoutsContext)

    if (!context) {
        throw Error('useWorkoutsContext must be used inside a WorkoutsContextProvider')
    }

    return context
}