const express = require('express')
require('./db/dbconnect')
const bodyParser = require('body-parser')

const app = express()

//PORT 
const PORT = process.env.PORT || 3000

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())
app.use(express.json())

//Tasks router
const taskRouter = require('./router/tasks/tasks.js')
app.use(taskRouter)

//Users router
const userRouter = require('./router/users/users.js')
app.use(userRouter)

//PORT
app.listen(PORT, () => {
    console.log('Server is runing on port ' + PORT)
})