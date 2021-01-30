import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";
const userAuth = {
    state() {
        return {
            token: null,
            _id: null,
            isLoggedin: false,
            
        };
    },
    mutations: mutations,
    actions: actions,
    getters: getters
}
export default userAuth;