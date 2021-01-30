export default {
    token(state) {
        return state.token
    },
    isLoggedin(state) {
        if (state.token !== null) {
            state.isLoggedin = true;
            console.log(state.isLoggedin)
        } else {
            state.isLoggedin = false;
            console.log(state.isLoggedin)
        }
        return state.isLoggedin
    }
}