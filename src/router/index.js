import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Default from '../views/Default.vue'
const routes = [
  {
    path: '/app/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/app',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Default
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import(/* webpackChunkName: "about" */ '../views/Test.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
