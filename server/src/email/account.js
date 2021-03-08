const sgmail = require('@sendgrid/mail')

sgmail.setApiKey(process.env.SENDGRID_API_KEY)

const welcomeEmail = (email, name) => {
    sgmail.send({
        to: email,
        from: 'ivan.ste1987@gmail.com',
        subject: 'Welcome to the Task-App',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app`
    })
}

const goodbayEmail = (email, name) => {
    sgmail.send({
        to: email,
        from: 'ivan.ste1987@gmail.com',
        subject: 'Account is deleted, Task-App',
        text: `Your account is deleted, ${name}.`
    })
}

module.exports = {
    welcomeEmail,
    goodbayEmail
}