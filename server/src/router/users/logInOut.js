const router = require('express').Router()
const auth = require('../../middleware/auth')
const User = require('../../db/models/users')

router.post('/api/users/login', async (req, res) => {
    console.log(req.body)
    console.log(req.headers)
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.genAuthToken()
        res.send({
            user,
            token
        })
    } catch (error) {
        res.status(400).send({
            error: "Wrong email or password."
        })
    }
})

router.post('/api/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.status(200).send({
            message: 'You are logout'
        })
    } catch (error) {
        res.status(500).send(error)
    }

})

router.post('/api/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()

        res.status(200).send({
            message: 'You are logout from all devices.'
        })
    } catch (error) {
        res.status(500).send(error)
    }
})


module.exports = router