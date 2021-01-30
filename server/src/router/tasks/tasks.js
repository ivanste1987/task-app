const router = require('express').Router()
const auth = require('../../middleware/auth')
const Task = require('../../db/models/tasks.js')


//creating a new task
router.post('/tasks', auth, async (req, res) => {

    //const task = new Task(req.body)
    console.log(req.body)
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send({
            task
        })
    } catch (error) {
        res.status(500).send({
            error: error
        })
    }



})
//reading all tasks
// GET /task?completed=true
// GET /task?limit=?&skip=?
// GET /task?sortBy=createdAt:desc
router.get('/tasks', auth, async (req, res) => {
    const match = {}
    const sort = {}

    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
        //const tasks = await User.findById({owner: req.user._id})

        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.status(201).send(req.user.tasks)
    } catch (error) {
        res.status(500).send({
            error: "Server error"
        })
    }
})

//finding task by ID
router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const taskByID = await Task.findOne({ _id, owner: req.user._id })

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


//Deleteing task from DB
router.delete('/tasks/delete/:id', auth, async (req, res) => {
    try {
        //const task = await Task.findByIdAndDelete(req.params.id)
        const task = await Task.findByIdAndDelete({ _id: req.params.id, owner: req.user._id })

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
router.patch('/tasks/update/:id', auth, async (req, res) => {
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
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })

        if (!task) {
            return res.status(400).send({
                message: 'Something went wrong'
            })
        }

        updates.forEach((update) => {
            return task[update] = req.body[update]
        })

        await task.save()

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