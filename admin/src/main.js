import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import axios from 'axios'

import App from './App'
import router from './router'
import { store } from './store/store'
import '../../../admin/src/registerServiceWorker';

Vue.prototype.$http = axios
Vue.config.productionTip = false


Vue.use(Vuetify);
Vue.use(VueRouter);

new Vue({ // eslint-disable-line no-new
  el: '#app',
  router,
  store,
  render: h => h(App),
});
