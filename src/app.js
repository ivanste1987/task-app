const express = require('express')
require('./db/dbconnect')
const bodyParser = require('body-parser')
const cors = require('cors')


const app = express()

//PORT 
const PORT = process.env.PORT

/* Cors */
app.use(cors())
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())
app.use(express.json())


//Middlewere Auth


//Tasks router
const taskRouter = require('./router/tasks/tasks.js')
app.use(taskRouter)

//Users router
const userRouter = require('./router/users/users.js')
app.use(userRouter)

//Login logout router
const logInOut = require('./router/users/logInOut')
app.use(logInOut)

//PORT
app.listen(PORT, () => {
    console.log('Server is runing on port ' + PORT)
})



