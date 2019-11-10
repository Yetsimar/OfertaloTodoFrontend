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

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(VueSweetalert2)
Vue.use(cookies)
<<<<<<< HEAD
axios.defaults.baseURL = 'http://localhost:3000'
=======
axios.defaults.baseURL = 'http://192.168.0.101:9004'
>>>>>>> 929290660c9b3d122f9fba7a7a21dfbe77258e16
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
