require('dotenv').config()

//REQUIRE EXPRESS
const express =  require('express')

//REQUIRE ROUTER
const workoutRoutes = require('./routes/workouts')

//CREATE EXPRESS APP
const app = express()

//LISTEN FOR REQUESTS
// we chose port 4000, when it listens we fire function
app.listen(process.env.PORT, () => {
    console.log('listening on port 4000')
})

//MIDDLEWARE
//Logging Middleware
// when we get a request, itll first run to here since this is the global middleware, then since we put next it'll run to the next piece of middleware
// we're using it rn to log requests we get
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})
//Json Parsing Middleware
//any reqs that come in it looks at the body of it, the data, and attaches it to the req obj
app.use(express.json())
//Route Middleware
// grabs all workout routes we defined and uses them in the app.
// ex) if in routes.js we have a / get route it'd be the same as writing app.get('/', ()=>{}) in this file
// we also added the string bc when we fire the request to that route, we want to use workoutRoutes
// ex) now if someone fires req to /api/workouts/ then it'd use the router.get('/',()=>{}) func
app.use('/api/workouts', workoutRoutes)
