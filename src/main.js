import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from "vuetify"
import store from './store/index.js'

Vue.use(Vuetify);

/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  components: { App }
});
