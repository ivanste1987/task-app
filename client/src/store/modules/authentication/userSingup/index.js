import axios from "axios";
const userSingup = {
    state() {
        return {
            user: {},
            message: { userError: '' }
        };
    },
    mutations: {
        createUser(state, payload) {
            state.user = payload;
        },
        createMessage(state, payload) {
            state.message.userError = payload
        }
    },
    actions: {
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
    },
    getters: {
        sendMessage(state) {
            return state.message
        }
    }
}
export default userSingup;