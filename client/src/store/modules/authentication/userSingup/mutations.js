export default {
    createUser(state, payload) {
        state.user = payload;
    },
    createMessage(state, payload) {
        state.message = payload
    }
}