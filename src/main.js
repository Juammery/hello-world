import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from './axios/index.js'
// 常用的一些方法的封裝
import './components/common/common.js'
import '@/assets/backZF.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/index.css'
// 自定义全局弹窗组件
import Popup from './components/popup'
import './assets/style/main.scss'
import MessageBox from './components/messageBox/index.js'
import getPdf from '@/utils/getPdf'
import htmlToPdf from '@/utils/htmlToPdf'
// 自定义输入框
Vue.use(MessageBox)
Vue.prototype.$popup = Popup.install
Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(htmlToPdf)
Vue.use(getPdf)
new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount("#app");
