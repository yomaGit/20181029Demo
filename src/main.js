// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

window.onerror=function (e) {
  console.log(`%c监控到了 window error`,'color:blue');
  console.log(e);
  console.log(arguments);

  return true;//- TODO return true 的情况下控制台不会输出错误信息
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
