import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Deck from '../views/Deck.vue'
import AsideView from '../views/AsideView.vue'
import Budgets from '../views/Budgets.vue'
import BudgetsAside from '../views/BudgetsAside.vue'
import BudgetDetail from '../views/BudgetDetail.vue'
import BudgetAside from '../views/BudgetAside.vue'
import BudgetNewAside from '../views/BudgetNewAside.vue'
import BudgetPrint from '../views/BudgetPrint.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    component: Deck,
    beforeEnter: checkUser,
    children: [
      {
        path: '/',
        redirect: { name: 'budgets' }
      },
      {
        path: 'budgets',
        component: AsideView,
        children: [
          {
            path: '/',
            name: 'budgets',
            components: {
              default: Budgets,
              aside: BudgetsAside
            }
          }
        ]
      },
      {
        path: 'budgets/new',
        component: AsideView,
        children: [
          {
            path: '/',
            name: 'budget-new',
            components: {
              default: BudgetDetail,
              aside: BudgetNewAside
            }
          }
        ]
      },
      {
        path: 'budgets/:id',
        component: AsideView,
        children: [
          {
            path: '/',
            name: 'budget-edit',
            components: {
              default: BudgetDetail,
              aside: BudgetAside
            },
            props: {
              default: true
            },
            children: [
              {
                path: 'view',
                name: 'budget-view',
                component: BudgetPrint,
                props (route) {
                  return Object.assign({}, route.params, route.query)
                }
              }
            ]
          }
        ]
      }
    ]
  }
]

function checkUser (to, from, next) {
  store
    .dispatch('user/user')
    .then(() => {
      next()
    })
    .catch(() => {
      next({
        name: 'login',
        query: { redirect: to.path },
        replace: true
      })
    })
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
