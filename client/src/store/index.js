import { createStore } from 'vuex'

import userAuth from './modules/authentication/userAuth/index.js'
import userSingup from './modules/authentication/userSingup/index.js'
import tasks from './modules/tasks/index.js'


const store = createStore({
  modules: {
    userAuth: userAuth,
    userSingup: userSingup,
    tasks: tasks
  },
  state(){
    return{
      authUser: false
    }
  }
})


export default store