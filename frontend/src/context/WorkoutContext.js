import {createContext, useReducer} from 'react'

// Ok so before we begin we need to address why we're creating contexts.
// Right now, when we update the database in any way, the site doesn't immediately reflect those changes. to see them, we have to refresh.
// So we want to update the state locally whenever we update the database
// we're going to invoke the dispatch function whenever we also update the db so there will be no need to refresh constantly!



//create a new context
export const WorkoutsContext = createContext()

//takes previous state and the action (which is the obj we passed into the dispatch func)
// in here we check the action type to decide how to update the state
export const workoutsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_WORKOUTS':
            return {
                workouts: action.payload
            }
        case 'CREATE_WORKOUT':
            return {
                //add single new workout to our existing array of workouts
                workouts: [action.payload, ...state.workouts]
            }
        case 'DELETE_WORKOUT':
            return {
                // the filter func returns true if we want the workout to remain in the new array
                workouts: state.workouts.filter( (w) => w._id !== action.payload._id)
            }
        case 'EDIT_WORKOUT': 
            const updatedWorkouts = state.workouts.map((w) => 
                w._id === action.payload.id 
                    ? { ...w, title: action.payload.title, load: action.payload.load, reps: action.payload.reps, createdAt: action.payload.createdAt }
                    : w
            )
            console.log('payload', action.payload)
            console.log('Updated workouts:', updatedWorkouts)

            return {
                workouts: updatedWorkouts
            }
        default:
            return state
    }
}

//provide the context to our app component tree
//children property represents whatever component this component wraps around
export const WorkoutsContextProvider = ({children}) => {
    // similar to useState in that we get back a value and a func to update it (dispatch), as well as specify inital value (obj with workouts prop)
    // difference is the reducer func 
    // to update the state obj, we'd call dispatch() and pass an object as an argument. The object should have a "type" property (syntax is normally all caps string)
    // that descs in words the state change we want to make. the second property is "payload" which descs any data we need to make this change. 
    // So when we call dispatch func, the reducer func is invoked and uses the type of the parameter to update the state accordingly
    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts: null
    })



    return (
        //wraps whatever needs access to the context
        // since the child will be the app component, our entire app will have access to the workoutsContext AND 
        // the state and dispatch values so its available for other components and we can begin to update values locally by using this global context
        //use spread operator to spread out different props within the object
        <WorkoutsContext.Provider value={{...state, dispatch}}>
            {children}
        </WorkoutsContext.Provider>
    )
}