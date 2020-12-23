const mongoose = require('../dbconnect')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//user db schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is not valid.")
            }
        }
    },
    password: {
        type: String,
        require: true,
        trim: true,
        minLength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('This is not good practise.')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error("Age is not valid.")
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})
//seting user with jwt token
userSchema.methods.genAuthToken = async function () {

    const user = this
    const token = jwt.sign({
        _id: user._id.toString()
    }, 'somesecretcode')


    user.tokens = user.tokens.concat({
        token
    })
    await user.save()

    return token
}
//Sending back data to user
userSchema.methods.toJSON = function () {
    const user = this

    const userData = user.toObject()

    delete userData.password
    delete userData.tokens
    delete userData._id
    delete userData.__v

    return userData
}

//auth of user password
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({
        email
    })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})


const User = mongoose.model('User', userSchema)


module.exports = User