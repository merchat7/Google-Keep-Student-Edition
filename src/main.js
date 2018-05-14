import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from "vuetify"

Vue.use(Vuetify);


/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  router,
  render: h => h(App),
  components: { App }
});
