import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vue2Filters from "vue2-filters";
import VueQrCode from '@chenfengyuan/vue-qrcode'
import VeeValidate, { Validator } from 'vee-validate'
import VeeValidateMessagesBr from 'vee-validate/dist/locale/pt_BR'
import './scss/app.scss'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all'

Vue.config.productionTip = false

Vue.use(VeeValidate, {
  events: 'blur|change'
})
Validator.localize('pt_BR',   VeeValidateMessagesBr)

Vue.use(Vue2Filters, {
  currency: {
    symbol: 'R$',
    thousandsSeparator: '.',
    decimalSeparator: ',',
    spaceBetweenAmountAndSymbol: true
  }
})

Vue.component(VueQrCode.name, VueQrCode)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
