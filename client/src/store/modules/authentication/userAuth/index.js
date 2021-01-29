const userAuth = {
    state() {
        return {
            doesUserExist: false,
        };
    },
    mutations: {
        checkUser(state, payload) {
            state.doesUserExist = payload
        }
    },
    actions: {
        checkUser(context) {
            const user = localStorage.getItem('user');
            if (user && user.token) {
                context.commit('checkUser', true)
                context.rootState.authUser = true
            } else; {
                context.commit('checkUser', false)
                context.rootState.authUser = false
            }
        }
    },
    getters: {
        userExist(state){
            return state.doesUserExist
        }
    }
}
export default userAuth;