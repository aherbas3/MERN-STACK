require('dotenv').config()

//REQUIRE EXPRESS
const express =  require('express')

//CREATE EXPRESS APP
const app = express()

//LISTEN FOR REQUESTS
// we chose port 4000, when it listens we fire function
app.listen(process.env.PORT, () => {
    console.log('listening on port 4000')
})

//REACT TO REQUESTS
// setting up a route handler
// responds to get request coming in, specifies route to local host port 4000/ (the route of the domain)
// so if you go to the route, it'll fire a func to handle the request and takes in req and res object. 
// send back a json string, which is our message
app.get('/', (req, res) => {
    res.json({msg: 'welcome to the app'})
})

//MIDDLEWARE
// when we get a request, itll first run to here since this is the global middleware, then since we put next it'll run to the next piece of middleware
// we're using it rn to log requests we get
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})
