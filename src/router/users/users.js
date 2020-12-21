const router = require('express').Router()
const User = require('../../db/models/users')


//creating new user
router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
}) 
//reading all users
router.get('/users', async (req, res) => {

    try {
        const allUsers = await User.find({})
        res.status(200).send(allUsers)

    } catch (error) {
        res.status(500).send({
            error: 'Server error'
        })
    }
})

//finding user by ID
router.get('/users/:id', async (req, res) => {

    try {
        const findUserBuId = await User.findById(req.params.id)

        if (!findUserBuId) {
            res.status(400).send({
                message: 'This user does not exist.'
            })
        }
        res.status(200).send({
            user: findUserBuId
        })
    } catch (error) {
        res.status(500).send({
            error: 'Server error'
        })
    }
})

//update user
router.patch('/users/update/:id', async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({
            error: 'Invalid updates!'
        })
    }

    try {
        const user = await User.findById(req.params.id)

        updates.forEach((update) => user[update] = req.body[update])
        await user.save()

        if (!user) {
            return res.status(404).send({
                error: "Bad Request"
            })
        }

        res.send(user)

    } catch (e) {
        res.status(400).send(e)
    }

})



//delete user
router.delete('/users/:id', async (req, res) => {

    try {
        const deleteUser = await User.findByIdAndDelete(req.params.id)

        if (!deleteUser) {
            res.status(400).send({
                error: 'This user does not exist.'
            })
        }
        res.status(201).send({
            deleted: deleteUser
        })
    } catch (error) {
        res.status(500).send({
            serverError: error
        })
    }

})

router.post('/users/login', async (req, res) => {
    console.log(req.body)
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        res.send(user)
    } catch (error) {
        res.status(400).send({error: "Wrong email or password."})
    }
})
module.exports = router