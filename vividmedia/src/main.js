/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composable
import { createApp } from 'vue'

const app = createApp(App)

registerPlugins(app)

app.mount('#app')

//import Vue from 'vue';
// import App from './App.vue';
//import vuetify from './plugins/vuetify';
// import 'vuetify/dist/vuetify.min.css'; // Ensure you import Vuetify CSS
// import VueRouter from 'vue-router';
// import VueTelInputVuetify from 'vue-tel-input-vuetify/lib';
// Vue.use(VueTelInputVuetify, {
//     vuetify,
//   });

// Vue.config.productionTip = false;
// Vue.use(VueRouter);

// const router = new VueRouter({
//   // ... your routes
//   scrollBehavior(to, from, savedPosition) {
//     return { x: 0, y: 0, behavior: 'smooth' };
//   },
// });

// new Vue({
//   vuetify,
//   router,
//   render: h => h(App),
// }).$mount('#app');