const router = require('express').Router()
const auth = require('../../middleware/auth')
const User = require('../../db/models/users')


//creating new user
router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.genAuthToken()
        res.status(201).send({
            user,
            token
        })
    } catch (e) {
        res.status(400).send(e)
    }
})


//Sending user profile
router.get('/users/profile', auth, async (req, res) => {
    res.send(req.user)
})


//update user
router.patch('/users/update/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({
            error: 'Invalid updates!'
        })
    }

    try {
        //const user = await User.findById(req.user._id)

        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()

        // if (!req.user) {
        //     return res.status(404).send({
        //         error: "Bad Request"
        //     })
        // }

        res.send(req.user)

    } catch (e) {
        res.status(400).send(e)
    }

})



//delete user
router.delete('/users/me', auth, async (req, res) => {

    try {
        // const deleteUser = await User.findByIdAndDelete(req.params.id)

        // if (!deleteUser) {
        //     res.status(400).send({
        //         error: 'This user does not exist.'
        //     })
        // }
        // res.status(201).send({
        //     deleted: deleteUser
        // })

        await req.user.delete()
        res.status(200).send({
            user: req.user,
            message: 'You are deleted.'
        })
    } catch (error) {
        res.status(500).send({
            serverError: error
        })
    }

})
//testing purposes
router.get('/', auth, async (req, res ) => {
    console.log(req.user)
})


module.exports = router