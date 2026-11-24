import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store.js'

import '../shared/ui/styles/base.css'
import '../shared/ui/styles/headerfooter.css'
import '../shared/ui/styles/feed.css'
import '../shared/ui/styles/forms.css'
import '../shared/ui/styles/utilities.css'
import '../shared/ui/styles/responsive.css'

createApp(App).use(store).use(router).mount('#app')
