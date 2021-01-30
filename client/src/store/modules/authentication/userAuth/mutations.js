export default  {
    setUser(state, payload) {
        state.token = payload.token;
        state._id = payload._id
        state.isLoggedin = payload.isLoggedin
    }
}