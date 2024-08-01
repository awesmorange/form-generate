import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import '@/styles/index.scss'
import '@/icons'
import axios from 'axios'
import Tinymce from '@/components/tinymce/index.vue'
import tsText from '@/components/ts-components/ts-text.vue'
import tsIframe from '@/components/ts-components/ts-iframe.vue'
import tsList from '@/components/ts-components/ts-list.vue'

Vue.component('tinymce', Tinymce)
Vue.component('ts-text', tsText)
Vue.component('ts-iframe', tsIframe)
Vue.component('ts-list', tsList)

Vue.config.productionTip = false
Vue.prototype.$axios = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
