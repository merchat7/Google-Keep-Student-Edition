import Vue from 'vue'
import App from './App'
import router from './router'

/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  router,
  render: h => h(App),
  components: { App }
});
