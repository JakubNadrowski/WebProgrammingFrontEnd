import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/Home.vue'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
import CreateSpot from '@/components/CreateSpot.vue'
import ManageSpots from '@/components/ManageSpots.vue'
import UserMod from '@/components/ManageUser.vue'
import ManageBookings from '@/components/ManageBookings.vue'
import { compile } from 'vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path:'/CreateSpot',
    name:'CreateSpot',
    component: CreateSpot
  },
  {
    path:'/ManageSpots',
    name:'ManageSpot',
    component: ManageSpots
  },
  {
    path: '/UserMod',
    name: 'ManageUser',
    component: UserMod
  },
  {
    path: '/ManageBookings',
    name: 'ManageBookings',
    component: ManageBookings
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
