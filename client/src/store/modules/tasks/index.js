import actions from './actions.js';
import getters from './getters.js';
import mutations from './mutations.js';


const tasks = {
    state() {
        return {
          allTasks: [],
        };
    },
    actions: actions,
    mutations: mutations,
    getters: getters
}

export default tasks;