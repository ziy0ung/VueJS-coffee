import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Cookies from 'js-cookie'

Vue.config.productionTip = false

// 쿠키에 저장된 토큰을 사용하여 인증
const savedToken = Cookies.get('accessToken');
if (savedToken) {
  store.dispatch('signinByToken', savedToken)
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
