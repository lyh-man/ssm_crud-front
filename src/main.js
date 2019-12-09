import Vue from 'vue'
import App from './App.vue'
// step1: ���� ViewUI
import ViewUI from 'view-design'
// step2: ���� css 
import 'view-design/dist/styles/iview.css'

Vue.config.productionTip = false
// step3:����ʹ�� ViewUI
Vue.use(ViewUI)

new Vue({
  render: h => h(App),
}).$mount('#app')
