
import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import BootstrapVueNext from 'bootstrap-vue-next';

// redifine bootstrap 
import '@src/styles/custom/_main.scss';

const app = createApp(App);

app.use(router);
app.use(BootstrapVueNext);
app.mount('#app');
