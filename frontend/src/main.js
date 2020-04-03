import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'
import { getToken } from './utils/auth'
import SvgIcon from 'vue-svgicon'
import { format, isDate, parse } from 'date-fns'
import VueCurrencyFilter from 'vue-currency-filter'
import Notifications from './plugins/notifications/Notifications'
import { VTooltip } from 'v-tooltip'
import { BUDGET_STATUS } from './Config'
import i18n from './plugins/i18n-lite'
import ES_MESSAGES from './i18n/es.json'
import EN_MESSAGES from './i18n/en.json'

Vue.config.productionTip = false

const apolloClient = new ApolloClient({
  uri: 'http://localhost:1337/graphql',
  request: (operation) => {
    const token = getToken()
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  }
})
const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

Vue.use(VueApollo)
Vue.use(SvgIcon, {
  tagName: 'svgicon'
})
Vue.use(VueCurrencyFilter, {
  symbol: '€',
  thousandsSeparator: '.',
  fractionCount: 2,
  fractionSeparator: ',',
  symbolPosition: 'back',
  symbolSpacing: true
})
Vue.use(Notifications)
Vue.use(i18n, {
  language: 'en',
  messages: {
    en: EN_MESSAGES,
    es: ES_MESSAGES
  }
})
Vue.directive('tooltip', VTooltip)

Vue.filter('date', function (value) {
  if (!value) return ''
  const date = isDate(value) ? value : parse(value, 'yyyy-MM-dd', new Date())
  return format(date, 'PP')
})

Vue.filter('reduce', function (arr, key) {
  if (!arr) return ''
  return arr.reduce((acc, current) => acc + Number(current[key]), 0)
})

new Vue({
  router,
  store,
  apolloProvider,
  data: {
    budgetStatusType: BUDGET_STATUS
  },
  render: h => h(App)
}).$mount('#app')
