import axios from 'axios';
export default {
    getUser(context) {
        const token = context.rootGetters.token;
        const authUser = {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }
        axios
            .get("http://localhost:3000/users/profile", authUser)
            .then((response) => {
                context.commit('getUser', response.data)

                context.commit('userLastToken',
                    response.data.tokens[response.data.tokens.length - 1].token)

                context.commit('userImage',
                    `http://localhost:3000/users/${response.data._id}/avatar`)

            }).catch((error) => {
                context.commit("responseMessage", error.message);
            })
    },
    addUserImage(context, payload) {
        const token = context.rootGetters.token;
        const authUser = {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }
        axios
            .post("http://localhost:3000/users/me/avatar", payload, authUser)
            .then((response) => {
                context.commit('userImage',
                    `http://localhost:3000/users/${response.data._id}/avatar`)
                context.commit("responseMessage", response.data.message);
                context.dispatch('getUser')
            })
            .catch((error) => {
                if (error)
                    context.commit("responseMessage",
                        "Not the appropriate image format, you can use PNG JPG JPEG SVG ");
            });
    },
    deleteUserImage(context) {
        const token = context.rootGetters.token;
        const authUser = {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }
        axios
            .delete("http://localhost:3000/users/me/avatar", authUser)
            .then((response) => {
                context.commit('userImage',
                    `http://localhost:3000/users/${response.data._id}/avatar`)
                context.commit("responseMessage", response.data.message);
            });
    },
    updateUserData(context, payload) {
        const token = context.rootGetters.token;
        const authUser = {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }
        const user = {
            name: payload.name,
            age: payload.age,
            email: payload.email,
            password: payload.password
        }
        console.log(user)
        axios
            .patch("http://localhost:3000/users/update/me", user, authUser)
            .then((response) => {
                context.commit('updateUser', response.data)
                context.commit("responseMessage", response.data.message);
            }).catch((error) => {
                if (error) {
                    context.commit("responseMessage",
                        'Bad request, you did something worng. Please try again.');
                }
            });
    },
    deleteProfile(context){
        const token = context.rootGetters.token;
        const authUser = {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }
        axios.delete('http://localhost:3000/users/me', authUser).then(()=> {
            context.commit('setUser', {
                _id: null,
                token: null,
                isLoggedin: false
            })
    
            localStorage.removeItem('user');
            localStorage.removeItem('id');
        })
    }




}