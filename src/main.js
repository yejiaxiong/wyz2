import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import axios from 'axios'
import echarts from 'echarts'
Vue.config.productionTip = false
// 配置请求根路径
axios.defaults.baseURL = 'http://192.168.2.15:8081/test/'  //guangming的局域ip
Vue.prototype.$http = axios
Vue.prototype.$echarts = echarts
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
