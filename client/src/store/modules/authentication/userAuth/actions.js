import axios from "axios";

export default {
    checkToken(context, payload) {
        payload = localStorage.getItem('user')
        return payload
    },

    async login(context, payload) {
        const user = {
            email: payload.email,
            password: payload.password,
        }
        const response = await axios.post("http://localhost:3000/users/login", { ...user })
        const responseData = await response;

        if (response.status !== 200) {
            const error = new Error(
                responseData.message || 'Failed to authenticate. Check your login data.'
            );
            throw error;
        }
        context.commit('setUser', {
            _id: responseData.data.user._id,
            token: responseData.data.token,
            isLoggedin: true
        })

        localStorage.setItem("user", responseData.data.token);
        localStorage.setItem('id', responseData.data.user._id)


    },

    async logout(context) {

        const reqAuth = {
            headers: {
                'Authorization': `Bearer ${context.state.token}`
            }
        }

        const response = await axios.post("http://localhost:3000/users/logout", {}, reqAuth)
        const responseData = await response;

        if (response.status !== 200) {
            const error = new Error(responseData.meesage || 'Something went wrong, please try again')
            throw error
        }

        localStorage.removeItem('user')
        localStorage.removeItem('id')

        context.commit('setUser', {
            _id: null,
            token: null,
            isLoggedin: false
        })


    },
    async logoutAll(context) {
        const reqAuth = {
            headers: {
                'Authorization': `Bearer ${context.state.token}`
            }
        }
        
        const response = await axios.post("http://localhost:3000/users/logoutAll", {}, reqAuth)

        const responseData = await response;

        if (response.status !== 200) {
            const error = new Error(responseData.meesage || 'Something went wrong, please try again')
            throw error
        }


        localStorage.removeItem('user');
        localStorage.removeItem('id');
        context.commit('setUser', {
            _id: null,
            token: null,
            isLoggedin: false
        })

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