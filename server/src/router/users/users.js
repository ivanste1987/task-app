const router = require('express').Router()
const auth = require('../../middleware/auth')
const User = require('../../db/models/users')
const multer = require('multer')
const sharp = require('sharp')
const { welcomeEmail, goodbayEmail } = require('../../email/account')

//creating new user
router.post('/users', async (req, res) => {
    console.log(req.body)
    const user = new User(req.body)

    try {
        await user.save()
        welcomeEmail(user.email, user.name)
        const token = await user.genAuthToken()
        res.status(201).send({
            message: `Your account has been created, please log in. Welcome ${user.name}!`
        })
    } catch (error) {
        console.log(error)
        if (error.name === 'MongoError') {
            res.status(409).send({ message: "Opsss, email already exist." })
        } else { res.status(400).send({ message: error }) }

    }
})

//Sending user profile
router.get('/users/profile', auth, async (req, res) => {
    res.send(req.user)
})

//update user
router.patch('/users/update/me', auth, async (req, res) => {
    console.log(req.body)
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'age', 'password', 'email']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({
            error: 'Invalid updates!'
        })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)

    } catch (e) {
        res.status(400).send(e)
    }

})

//delete user
router.delete('/users/me', auth, async (req, res) => {

    try {
        await req.user.delete()
        goodbayEmail(req.user.email, req.user.name)
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

//Upload image
const upload = multer({
    limits: {
        fileSize: 10000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error('Please upload valid image format.'))
        }
        cb(undefined, true)
    }
})
const avatar = upload.single('avatar')

//adding avatar img to user
router.post('/users/me/avatar', auth, avatar, async (req, res) => {
    console.log(req.file)
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();
    req.user.avatar = buffer
    await req.user.save()
    res.status(200).send({ message: 'Avatar is added.' })
}, (error, req, res, next) => {
    res.status(400).send({
        error: "Something went wront, please try again later.",
        err: error.message
    })
})

//deleting a user avatar img
router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send({ message: 'Youre picture is deleted' })
})

//geting user avatar img
router.get('/users/:id/avatar', async (req, res) => {

    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
            res.status(204).send({ message: "Please add Your Avatar" })
            return
        }

        res.set('Content-Type', 'image/jpg')
        res.send(user.avatar)

    } catch (error) {
        res.send({ error: error.message })
    }
})


module.exports = router