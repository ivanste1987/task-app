import actions from './actions.js';
import getters from './getters.js';
import mutations from './mutations.js';


const tasks = {
  state() {
    return {
      allTasks: [],
      task: {}
    };
  },
  mutations: mutations,
  actions: actions,
  getters: getters
}

export default tasks;