import axios from "axios";

export default {
    checkToken(payload) {
        payload = localStorage.getItem('user')
        return payload
    },

    async login(context, payload) {
        const user = {
            email: payload.email,
            password: payload.password,
        }
        await axios.post("http://localhost:3000/users/login", { ...user })
            .then((response) => {
                if (response.status !== 200) {
                    const error = new Error(
                        response.message || 'Failed to authenticate. Check your login data.'
                    );
                    throw error;
                } else {
                    context.commit('setUser', {
                        _id: response.data.user._id,
                        token: response.data.token,
                        isLoggedin: true
                    })
                    localStorage.setItem("user", response.data.token);
                    localStorage.setItem('id', response.data.user._id)
                }
            }).catch((error) => {
                if (error) throw error
            })
    },

    logout(context) {
        const reqAuth = {
            headers: {
                'Authorization': `Bearer ${context.state.token}`
            }
        }

        axios.post("http://localhost:3000/users/logout", {}, reqAuth)
            .then((response) => {
                if (response.status !== 200) {
                    const error = new Error(response.meesage || 'Something went wrong, please try again')
                    throw error
                }
            })

        context.commit('setUser', {
            _id: null,
            token: null,
            isLoggedin: false
        })
        localStorage.removeItem('user')
        localStorage.removeItem('id')

    },
    logoutAll(context) {
        const reqAuth = {
            headers: {
                'Authorization': `Bearer ${context.state.token}`
            }
        }
        axios.post("http://localhost:3000/users/logoutAll", {}, reqAuth)
            .then((response) => {
                if (response.status !== 200) {
                    const error = new Error(response.meesage || 'Something went wrong, please try again')
                    throw error
                }
            })

        context.commit('setUser', {
            _id: null,
            token: null,
            isLoggedin: false
        })

        localStorage.removeItem('user');
        localStorage.removeItem('id');

    },
    stayLoggedin(context) {
        const token = localStorage.getItem('user');
        const userID = localStorage.getItem('id')

        if (token && userID) {
            context.commit('setUser', {
                token: token,
                userID: userID
            })
        }

    },
}