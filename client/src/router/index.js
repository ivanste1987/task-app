import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue';
import About from '../views/About.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
