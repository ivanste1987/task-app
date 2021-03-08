import { createStore } from 'vuex'

import userAuth from './modules/authentication/userAuth/index.js'
import userSingup from './modules/authentication/userSingup/index.js'
import tasks from './modules/tasks/index.js'
import user from './modules/users/index.js'


const store = createStore({
  modules: {
    userAuth: userAuth,
    userSingup: userSingup,
    tasks: tasks,
    user: user
  }
})


export default store