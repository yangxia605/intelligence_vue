// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store'
import '../src/icons' // icon
import VueResource from 'vue-resource'
import axios from 'axios'
import qs from 'qs'
import '@/styles/index.scss' // global css
import components from '@/components/index.js';
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(components);
Vue.use(VueResource);
Vue.use(codemirror);
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

//自动给同一个vue项目的所有请求添加请求头
axios.interceptors.request.use(function (config) {
  let token = localStorage.getItem('authorization');
  if (token) {
    config.headers['Authorization'] = token;
  }
  return config;
})

