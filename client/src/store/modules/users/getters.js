export default {
    provideUser(state) {
        return state.user;
    },
    userToken(state) {
        return state.token
    },
    userImage(state) {
        return state.imagePath
    },
    responseMessage(state) {
        return state.message
    },
    updatedUser(state) {
        return state.user
    }

}