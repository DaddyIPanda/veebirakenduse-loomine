import { createRouter, createWebHistory } from 'vue-router'
import Login from '../pages/login/ui/Login.vue'
import AddPost from '../pages/add-post/ui/AddPost.vue'
import Home from '../pages/home/ui/Home.vue'
import { ROUTES } from '../shared/config/routes'

const routes = [
  { path: ROUTES.home, component: Home },
  { path: ROUTES.add, component: AddPost },
  { path: ROUTES.login, component: Login },
]

export function createAppRouter() {
  return createRouter({
    history: createWebHistory(),
    routes,
  })
}

export default createAppRouter()
