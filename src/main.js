import Vue from 'vue'
import App from './App.vue'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import Axios from 'axios'

Vue.config.productionTip = false
Vue.use(ViewUI)
Vue.prototype.$axios = Axios
Axios.defaults.baseURL = '/api'

new Vue({
  render: h => h(App),
}).$mount('#app')
