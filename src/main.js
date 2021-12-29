import Vue from 'vue'
import App from './App.vue'
import router from './routes'
import store from './store';
import axios from 'axios'
import VueAxios from 'vue-axios'
import VeeValidate from 'vee-validate';
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueAuthenticate from 'vue-authenticate'

Vue.use(VueAuthenticate, {
  tokenName: 'token',
  storageType: 'localStorage',
  tokenPath: 'token',
  providers: {
    github: {
      clientId: '',
      redirectUri: 'http://localhost:8080/auth/callback' // Your client app URL
    }
  },
  bindRequestInterceptor: function () {
    this.$http.interceptors.request.use((config) => {
      if (this.isAuthenticated()) {
        config.headers['Authorization'] = [
          this.options.tokenType, this.getToken()
        ].join(' ')
      } else {
        delete config.headers['Authorization']
      }
      return config
    })
  },

  bindResponseInterceptor: function () {
    this.$http.interceptors.response.use((response) => {
      console.log('responsinng...', response)
      this.setToken(response)
      return response
    })
  }
})

Vue.config.productionTip = false
Vue.use(VeeValidate)
Vue.use(VueAxios, axios.create({
  baseURL: 'http://localhost:8000/api/',
}))
Vue.use(BootstrapVue)
Vue.component('pagination', require('laravel-vue-pagination'));
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
