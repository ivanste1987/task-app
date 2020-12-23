const router = require('express').Router()
const auth = require('../../middleware/auth')

const Task = require('../../db/models/tasks.js')



//creating a new task
router.post('/tasks', auth, async (req, res) => {
console.log(req.body)
    //const task = new Task(req.body)

    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        const newTask = await task.save()
        res.status(201).send({
            newTask
        })
    } catch (error) {
        res.status(500).send({
            error: error
        })
    }



})
//reading all tasks
router.get('/tasks', async (req, res) => {
    try {
        const allTasks = await Task.find({})
        res.status(201).send(allTasks)
    } catch (error) {
        res.status(500).send()
    }
})

//finding task by ID
router.get('/tasks/:id', async (req, res) => {
    try {
        const taskByID = await Task.findById(req.params.id)
        if (!taskByID) {
            return res.status(404).send({
                message: 'Task is not found.'
            })
        }
        res.status(200).send(taskByID)
    } catch (error) {
        res.status(500).send({
            message: 'Server error.'
        })
    }

})


//Dealiting task from DB
router.delete('/tasks/delete/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task) {
            return res.status(404).send({
                message: 'This task do not exist'
            })
        }
        res.status(201).send({
            deleted_task: task
        })
    } catch (e) {
        res.status(500).send(e)
    }
})

//update of tasks
router.patch('/tasks/update/:id', async (req, res) => {
    //validation of incoming request for updates values
    const allowedUpdates = ["completed", 'description']
    const updates = Object.keys(req.body)
    const isUpadateValid = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isUpadateValid) {
        return res.status(400).send({
            error: "Invalid update"
        })
    }
    try {
        const task = await Task.findById(req.params.id)

        updates.forEach((update) => {
            return task[update] = req.body[update]
        })


        if (!task) {
            return res.status(400).send({
                message: 'Something went wrong'
            })
        }
        res.status(200).send({
            update: task
        })
    } catch (error) {
        res.status(500).send({
            error: "Server errore"
        })
    }
})

module.exports = router