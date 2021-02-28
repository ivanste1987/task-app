import actions from './actions.js';
import getters from './getters.js';
import mutations from './mutations.js';


const tasks = {
  state() {
    return {
      allTasks: [],
      task: {},
      completedTasks: 0,
      taskMessage: null
    };
  },
  mutations: mutations,
  actions: actions,
  getters: getters
}

export default tasks;