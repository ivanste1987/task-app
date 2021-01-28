import { createStore } from 'vuex'

import userAuth from './modules/authentication/userAuth/index.js'
import userSingup from './modules/authentication/userSingup/index.js'


const store = createStore({
  modules: {
    userAuth: userAuth,
    userSingup: userSingup
  }
})


export default store