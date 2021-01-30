import axios from "axios";
export default {
    createUser(context, payload) {
        const newUser = {
            name: payload.name,
            email: payload.email,
            password: payload.password,
            age: payload.age,
        };
        axios.post("http://localhost:3000/users", newUser)
            .then((response) => {
                if (response.status === 201) {
                    context.commit('createMessage', response.data.message)
                }
            }).catch(error => {
                if (error) {
                    context.commit('createMessage', error.response.data.message)
                }
            })
        context.commit('createUser', {
            ...newUser
        })
    }
}