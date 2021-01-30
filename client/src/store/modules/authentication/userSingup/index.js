
import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';
const userSingup = {
    state() {
        return {
            user: {},
            message: ""
        };
    },
    mutations: mutations,
    actions: actions,
    getters: getters
}
export default userSingup;