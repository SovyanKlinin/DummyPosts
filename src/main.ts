import { createApp } from 'vue'
import '../src/styles/style.scss'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCopyright, faEye, faMagnifyingGlass, faPlus, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { faBluesky, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons'
library.add( faMagnifyingGlass, faFacebook, faTwitter, faBluesky, faCopyright, faThumbsUp, faThumbsDown, faEye, faPlus );

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(ElementPlus);
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app');
