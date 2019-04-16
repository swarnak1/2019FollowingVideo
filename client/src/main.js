import Vue from 'vue'
import Vuetify from 'vuetify'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false
Vue.prototype.$http = axios.create({
  baseURL: `http://127.0.0.1:3000/api/v1`,
  headers: {
    Authorization: `Bearer`
  }
})

Vue.use(Vuetify)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

