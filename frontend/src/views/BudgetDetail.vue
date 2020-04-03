<template>
  <div>
    <router-link to="/budgets" class="flex items-center font-brand font-bold text-brand mb-4 color-link--brand">
      <svgicon name="arrow" width="12" height="16" class="mr-4"></svgicon>
      <span>Back</span>
    </router-link>
    <div v-if="!$apollo.loading">
      <h1 class="text-4xl font-brand font-bold mb-4">Budget</h1>
      <div class="form">
        <div class="field span-2">
          <label for="name" class="label">Name</label>
          <input type="text" class="input-text input" v-model="editData.name">
        </div>
        <div class="field">
          <label for="clients" class="label">Client</label>
          <custom-select>
            <select name="client" class="w-full" v-model="editData.client">
              <option value="">Select client</option>
              <option v-for="client in clients" :value="client.id" :key="client.id">{{ client.name }}</option>
            </select>
          </custom-select>
        </div>
        <div class="field">
          <label for="date" class="label">Date</label>
          <date-picker v-model="editData.date" :options="{ mode: 'dp-below' }" class="input-text input"/>
        </div>
        <div class="field span-2">
          <label for="descrip" class="label">Description</label>
          <vue-simplemde v-model="editData.descrip" :configs="editorConfig" class="editor-height--small" />
        </div>
        <hr class="border-0 border-b border-lightbrand span-2">
        <div class="field span-2">
          <div class="mb-4">
            <p class="font-brand font-bold text-brand">Tasks</p>
          </div>
          <div class="tasks">
            <p class="tasks__conceptlabel font-bold">Concept</p>
            <p class="tasks__amountlabel font-bold">Amount</p>
            <template v-for="task in notErasedTasks">
              <vue-simplemde v-model="task.name" :configs="editorConfig" class="editor-height--small" :key="`name-${task.id}`"/>
              <input type="text" class="input-text input" v-model="task.amount" :key="`amount-${task.id}`">
              <button type="button" :key="`delete-${task.id}`" class="color-link--brand" @click="deleteTask(task.id)">
                <svgicon name="delete" width="20" height="20" class="icon"></svgicon>
              </button>
            </template>
            <div>
              <button type="button" class="btn-brand" @click="addTask">Add task</button>
            </div>
            <div>
              <p>Total amount:</p>
              <p class="font-bold">{{ notErasedTasks | reduce('amount') | currency }}</p>
            </div>
          </div>
        </div>
        <hr class="border-0 border-b border-lightbrand span-2">
        <div class="field span-2">
          <label for="descrip" class="label">Timing</label>
          <vue-simplemde v-model="editData.timing" :configs="editorConfig" class="editor-height--medium" />
        </div>
        <div class="field span-2">
          <label for="descrip" class="label">Requirements</label>
          <vue-simplemde v-model="editData.requirements" :configs="editorConfig" class="editor-height--medium" />
        </div>
        <div class="field span-2">
          <label for="descrip" class="label">Compatibility</label>
          <vue-simplemde v-model="editData.compatibility" :configs="editorConfig" class="editor-height--medium" />
        </div>
        <div class="field span-2">
          <label for="descrip" class="label">Deliverables</label>
          <vue-simplemde v-model="editData.deliverables" :configs="editorConfig" class="editor-height--medium" />
        </div>
        <div class="field span-2">
          <label for="descrip" class="label">No inclusive</label>
          <vue-simplemde v-model="editData.noinclusive" :configs="editorConfig" class="editor-height--medium" />
        </div>
      </div>
    </div>
    <transition name="fade">
      <router-view :key="$route.name"></router-view>
    </transition>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import BUDGET_QUERY from '../graphql/Budget.gql'
import BUDGET_UPDATE from '../graphql/BudgetUpdate.gql'
import BUDGET_CREATE from '../graphql/BudgetCreate.gql'
import CLIENTS_QUERY from '../graphql/Clients.gql'
import TASK_UPDATE_QUERY from '../graphql/TaskUpdate.gql'
import TASK_CREATE_QUERY from '../graphql/TaskCreate.gql'
import TASK_DELETE_QUERY from '../graphql/TaskDelete.gql'
import CustomSelect from '../components/CustomSelect'
import DatePicker from '../components/DatePicker'
import '../components/icons/arrow'
import '../components/icons/delete'
import VueSimplemde from 'vue-simplemde'
import 'simplemde/dist/simplemde.min.css'
import { EventBus } from '../event-bus'
import { EDITOR_TOOLBAR } from '../Config'
import { findIndex, omit } from 'lodash'
import { format } from 'date-fns'
export default {
  components: {
    CustomSelect,
    DatePicker,
    VueSimplemde
  },
  props: ['id'],
  data () {
    return {
      isEditing: !!this.id,
      editData: {
        date: format(new Date(), 'yyyy-MM-dd'),
        client: '',
        tasks: []
      },
      editorConfig: {
        spellChecker: false,
        status: false,
        toolbar: EDITOR_TOOLBAR
      }
    }
  },
  created () {
    EventBus.$on('save-budget', this.save)
    EventBus.$on('print-budget', this.print)
  },
  beforeDestroy () {
    EventBus.$off('save-budget', this.save)
    EventBus.$off('print-budget', this.print)
  },
  apollo: {
    budget: {
      query: BUDGET_QUERY,
      variables () {
        return {
          id: this.id
        }
      },
      result ({ data, loading }) {
        if (loading) {
          return
        }
        this.editData = { ...JSON.parse(JSON.stringify(this.budget)), client: this.budget.client.id }
      },
      fetchPolicy: 'cache-and-network',
      skip () {
        return !this.isEditing
      }
    },
    clients: {
      query: CLIENTS_QUERY,
      fetchPolicy: 'cache-and-network'
    }
  },
  computed: {
    ...mapState('user', {
      userID: state => state.user.id
    }),
    notErasedTasks () {
      return this.editData.tasks.filter(task => task.mode !== 'erased')
    }
  },
  methods: {
    ...mapMutations('loading', {
      sending: 'setBudgetDetail'
    }),
    addTask () {
      this.editData.tasks.push({ id: Math.random().toString(36).substr(2, 9), name: '', amount: 0, mode: 'added' })
    },
    deleteTask (id) {
      const idx = findIndex(this.editData.tasks, task => task.id === id)
      const task = this.editData.tasks[idx]
      if (task.mode === 'added') {
        this.editData.tasks.splice(idx, 1)
        return
      }
      task.mode = 'erased'
      this.$set(this.editData.tasks, idx, task)
    },
    saveTasks () {
      const tasksMutations = this.editData.tasks.map(task => {
        task.amount = Number(task.amount)
        if (task.mode === 'added') {
          return this.$apollo.mutate({
            mutation: TASK_CREATE_QUERY,
            variables: {
              data: omit(task, ['id', 'mode'])
            }
          })
        }
        if (task.mode === 'erased') {
          return this.$apollo.mutate({
            mutation: TASK_DELETE_QUERY,
            variables: {
              id: task.id
            }
          })
        }
        return this.$apollo.mutate({
          mutation: TASK_UPDATE_QUERY,
          variables: {
            id: task.id,
            data: omit(task, ['id', 'mode', '__typename'])
          }
        })
      })
      return Promise.all(tasksMutations)
    },
    getSaveMutation (tasksIds) {
      return this.isEditing
        ? this.$apollo.mutate({
          mutation: BUDGET_UPDATE,
          variables: {
            id: this.id,
            data: { ...omit(this.editData, ['id', '__typename']), tasks: tasksIds }
          },
          update: (store, { data: { updateBudget: { budget } } }) => {
            const budgetQuery = {
              query: BUDGET_QUERY,
              variables: {
                id: this.id
              }
            }
            const data = store.readQuery(budgetQuery)
            data.budget = budget
            data.budget.tasks = this.editData.tasks.map(task => Object.assign({}, task, { __typename: 'Task' }))
            store.writeQuery({ ...budgetQuery, data })
          }
        })
        : this.$apollo.mutate({
          mutation: BUDGET_CREATE,
          variables: {
            data: { ...omit(this.editData, ['id', '__typename']), tasks: tasksIds, owner: this.userID }
          }
        })
    },
    async save () {
      this.sending(true)
      const data = await this.saveTasks()
      this.editData.tasks = data.filter(task => !task.data.deleteTask).map(task => {
        return omit(
          task.data.createTask
            ? task.data.createTask.task
            : task.data.updateTask.task,
          ['__typename']
        )
      })
      const tasksIds = this.editData.tasks.map(task => task.id)
      try {
        await this.getSaveMutation(tasksIds)
      } catch (error) {
        this.$addNotification({
          type: 'error',
          dismissAfter: 5000,
          text: error.message
        })
      }
      this.sending(false)
      if (!this.isEditing) {
        this.$router.push({ name: 'budgets' })
      }
    },
    print (query) {
      this.$router.push({ name: 'budget-view', query })
    }
  }
}
</script>

<style scoped>
.form {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 2rem;
}
.span-2 {
  grid-column: 1 / span 2;
}
.label {
  display: block;
  font-weight: bold;
  @apply mb-1;
}
input {
  width: 100%;
}
.editor-height--small /deep/ .CodeMirror,
.editor-height--small /deep/ .CodeMirror-scroll {
  min-height: 120px;
}
.editor-height--medium /deep/ .CodeMirror,
.editor-height--medium /deep/ .CodeMirror-scroll {
  min-height: 200px;
}
.tasks {
  display: grid;
  grid-template-columns: 9fr 2fr 1fr;
  grid-gap: 1rem;
  align-items: start;
}
.tasks__conceptlabel {
  grid-column: 1 / 2;
}
.tasks__amountlabel {
  grid-column: 2 / 4;
}
</style>
