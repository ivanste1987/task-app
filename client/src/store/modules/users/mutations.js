export default {
    getUser(state, payload) {
        state.user = payload
    },
    userLastToken(state, payload) {
        state.token = payload
    },
    userImage(state, payload) {
        state.imagePath = payload
    },
    responseMessage(state, payload){
        state.message = payload
    },
    updateUser(state, payload) {
        state.user = payload
    },
    deleteProfile(state,payload){
        state.user = payload
    }
}
