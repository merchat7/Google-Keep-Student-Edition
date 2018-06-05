import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from "vuetify"
import store from './store/index.js'
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import VueOnsen from 'vue-onsenui'; // This already imports 'onsenui'

Vue.use(Vuetify);
Vue.use(VueOnsen);

/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  components: { App }
});
