export default {
    token(state) {
        return state.token
    },
    isLoggedin(state) {
        if (state.token !== null) {
            state.isLoggedin = true;
        } else {
            state.isLoggedin = false;
        }
        return state.isLoggedin
    }
}