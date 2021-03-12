import axios from "axios";
export default {
    createUser(context, payload) {
        const newUser = {
            name: payload.name,
            email: payload.email,
            password: payload.password,
            age: payload.age,
        };
        axios.post("api/users", newUser)
            .then((response) => {
                if (response.status === 201) {
                    context.commit('createMessage', response.data.message)
                }
            }).catch((error) => {
                
                if (error.response.status === 409) {
                    context.commit('createMessage', error.response.data.message)
                }
                else if (error.response.data.message.errors.password) {
                    context.commit('createMessage', "Opps, the password should be longer than 7 letters")
                }
                else if (error.response.data.message.errors.name) {
                    context.commit('createMessage', "Opps, name is required.")
                }
                else if (error.response.data.message.errors.email) {
                    context.commit('createMessage', "Opps, email is not valid.")
                }
                
            })
        context.commit('createUser', {
            ...newUser
        })
    }
}