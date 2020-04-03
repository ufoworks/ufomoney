<template>
  <div>
    <h1 class="text-4xl font-brand font-bold mb-1">Budgets</h1>
    <div class="flex justify-between items-end mb-8">
      <p class="font-bold text-lightgray text-sm" v-if="filters && filters.date">{{ filters.date.start | date }} - {{ filters.date.end | date }}</p>
      <div>
        <button class="btn-brand" @click="gotoNew">New budget</button>
      </div>
    </div>
    <transition-group tag="ul" name="fade" class="mb-8">
      <li v-for="budget in notErasedBudgets" :key="budget.id" class="mb-4">
        <budget-list-item
          :data="budget"
          @detail="gotoDetail(budget.id)"
          @accept="acceptItem(budget.id)"
          @reject="rejectItem(budget.id)"
          @copy="copyItem(budget.id)"
          @delete="deleteItem(budget)"
        />
      </li>
    </transition-group>
    <div class="flex justify-end">
      <p v-if="budgets" class="font-bold">Total: {{ accAmount | currency }}</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import BUDGETS from '../graphql/Budgets.gql'
import BUDGET_UPDATE from '../graphql/BudgetUpdate.gql'
import BUDGET_DELETE from '../graphql/BudgetDelete.gql'
import TASK_DELETE_QUERY from '../graphql/TaskDelete.gql'
import { mapFilters } from '../utils/data'
import { getBackendURL } from '../utils/network'
import { axiosJWT } from '../utils/auth'
import { BUDGET_STATUS } from '../Config'
import BudgetListItem from '../components/BudgetListItem'
import '../components/icons/menu'
import { findIndex } from 'lodash'

export default {
  name: 'home',
  components: {
    BudgetListItem
  },
  apollo: {
    budgets: {
      query: BUDGETS,
      variables () {
        return {
          sort: 'date:desc',
          where: this.mapedFilters
        }
      },
      fetchPolicy: 'cache-and-network'
    }
  },
  computed: {
    ...mapState('filters', {
      filters: state => state.budget
    }),
    mapedFilters () {
      return mapFilters(this.filters)
    },
    notErasedBudgets () {
      return this.budgets ? this.budgets.filter(item => !item.erased) : []
    },
    accAmount () {
      return this.notErasedBudgets.reduce((acc, current) => {
        return acc + current.tasks.reduce((accT, currentT) => accT + Number(currentT.amount), 0)
      }, 0)
    }
  },
  methods: {
    updateItem (id, data) {
      this.$apollo.mutate({
        mutation: BUDGET_UPDATE,
        variables: {
          id,
          data
        },
        update: (store, { data: { updateBudget: { budget } } }) => {
          const budgetQuery = {
            query: BUDGETS,
            variables: {
              sort: 'date:desc',
              where: this.mapedFilters
            }
          }
          const data = store.readQuery(budgetQuery)
          const idx = findIndex(data.budgets, { id })
          data.budgets[idx] = budget
          store.writeQuery({ ...budgetQuery, data })
        }
      })
    },
    async copyItem (id) {
      await axiosJWT.post(getBackendURL(`budgets/${id}/clone`))
      this.refreshItems()
    },
    async deleteItem (budget) {
      this.$addNotification({
        text: 'You\'ve deleted an budget, are you sure?',
        actionText: 'Undo',
        onAction: async () => {
          this.updateItem(budget.id, { erased: false })
        },
        onDismiss: async () => {
          budget.tasks.forEach(task => {
            this.$apollo.mutate({
              mutation: TASK_DELETE_QUERY,
              variables: {
                id: task.id
              }
            })
          })
          this.$apollo.mutate({
            mutation: BUDGET_DELETE,
            variables: {
              id: budget.id
            }
          })
        }
      })
      this.updateItem(budget.id, { erased: true })
    },
    acceptItem (id) {
      this.updateItem(id, { status: BUDGET_STATUS.ACCEPTED })
    },
    rejectItem (id) {
      this.updateItem(id, { status: BUDGET_STATUS.REJECTED })
    },
    gotoDetail (id) {
      this.$router.push({ name: 'budget-edit', params: { id } })
    },
    gotoNew () {
      this.$router.push({ name: 'budget-new' })
    },
    refreshItems () {
      this.$apollo.queries.budgets.refresh()
    }
  }
}
</script>
