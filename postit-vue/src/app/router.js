// Maps application URLs to the page components rendered by the app shell.
import { createRouter, createWebHistory } from 'vue-router'
import { ROUTES } from '../shared/config/routes'

const routes = [
  { path: ROUTES.home, component: () => import('../pages/home/ui/Home.vue') },
  { path: ROUTES.add, component: () => import('../pages/add-post/ui/AddPost.vue') },
  { path: ROUTES.login, component: () => import('../pages/login/ui/Login.vue') },
  { path: ROUTES.signup, component: () => import('../pages/singup/ui/Signup.vue') },
]

export function createAppRouter() {
  return createRouter({
    history: createWebHistory(),
    routes,
  })
}

export default createAppRouter()
