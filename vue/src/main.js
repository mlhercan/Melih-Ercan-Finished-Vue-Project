import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
const app= createApp(App);
app.use(router)
app.config.globalProperties.$accessTokenKey = "accessTokenKey"
app.mount('#app')
import jQuery from 'jquery';
global.jQuery=jQuery;
global.$=jQuery;
import "bootstrap";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/css/bootstrap.css";
import "./views/styles.css";

