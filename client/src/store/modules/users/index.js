import mutations from './mutations'
import actions from './actions'
import getters from './getters'
const users = {
    state(){
        return{
            user:{},
            imagePath: null,
            userID: null,
            token: null,
            message: null

        }
    },
    mutations: mutations,
    actions: actions,
    getters: getters
}
export default users;