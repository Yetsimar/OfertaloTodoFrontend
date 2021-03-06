import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueSweetalert2 from 'vue-sweetalert2'
import axios from 'axios'
import VueAxios from 'vue-axios'
import cookies from 'vue-cookies'
import 'sweetalert2/dist/sweetalert2.min.css'
import VueMoment from 'vue-moment'
const moment = require('moment')
moment.locale('es')
Vue.use(VueMoment, moment)
Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(VueSweetalert2)
Vue.use(cookies)
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
