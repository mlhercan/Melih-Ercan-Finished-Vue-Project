import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateView from '../views/CreateView.vue'
import UpdateView from '../views/UpdateView.vue'
import LoginComponent from '../views/Login.vue'
import RegisterComponent from '../views/Register.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/addStudent',
    name: 'Create',
    component: CreateView
  },
  {
    path: '/updateStudent/:id',
    name: 'Update',
    component: UpdateView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginComponent
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterComponent
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})



export default router
