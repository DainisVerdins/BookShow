
import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import BootstrapVueNext from 'bootstrap-vue-next';

// redefine bootstrap 
import '@/styles/custom/_main.scss';

const app = createApp(App);

app.use(router);
app.use(BootstrapVueNext);
app.mount('#app');
