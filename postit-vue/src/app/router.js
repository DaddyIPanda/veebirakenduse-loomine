import { createRouter, createWebHistory } from 'vue-router'
import Login from '../pages/login/ui/Login.vue'
import AddPost from '../pages/add-post/ui/AddPost.vue'
import Home from '../pages/home/ui/Home.vue'
import { ROUTES } from '../shared/config/routes'
import App from './App.vue'

// The app route is the root of every screen. Its loader, initApp, prepares the Telegram seam and
// has the server check the launch data; until it settles the fallback shows, and only a
// successful check lets a screen render. A failed one shows the route's error boundary, whose
// Retry runs the loader again. The screens are its children. A reload on an inner route returns
// the same screen because the hosting answers unknown paths with index.html ("spa": true in
// tgcloud.jsonc).
export const router = [
  {
    // Vue Router не использует id, но можно оставить его в meta или как кастомное свойство
    path: ROUTES.home,
    component: App,
    
    children: [
      // В Vue Router index: true заменяется на пустой path
      { path: '', component: Home }, 
      { path: ROUTES.add, component: AddPost },
      { path: ROUTES.login, component: Login },
    ],
  },
]

/** The browser router; creating it starts the app route's loader. */
export function createAppRouter() {
  return createRouter({
    history: createWebHistory(),
    router,
  })
}

export default router
