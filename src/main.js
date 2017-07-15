// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

import store from './store/index.js'
import {formatDate} from './common/js/date.js'

import './common/less/index.less'


Vue.config.productionTip = false

//配置axios，便于在各组件中使用
Vue.prototype.$http=axios

//全局过滤器
Vue.filter('formatDate',function(time){
		let date=new Date(time);
		return formatDate(date,'yyyy-MM-dd hh:mm');
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
