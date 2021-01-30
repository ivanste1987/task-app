import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue';
import Profile from '../components/user/Profile.vue';
import Tasks from '../components/tasks/Tasks.vue'
import Todo from '../views/Todo.vue';
import store from '../store/index.js'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta: {unauth: true} ,
    },
    {
      path: '/todo',
      name: 'Todo',
      component: Todo,
      meta: {auth: true} ,
      children: [{
        path: '/profile',
        name: 'Profile',
        component: Profile
      }, {
        path: '/tasks',
        name: 'Tasks',
        component: Tasks,
      }]
    },
  ]
})

router.beforeEach(function(to, _, next){
  if(to.meta.auth && !store.getters.isLoggedin){
    next('/')
  }else if(to.meta.unauth && store.getters.isLoggedin){
    next('/todo')
  }else{
    next()
  }
})

export default router
