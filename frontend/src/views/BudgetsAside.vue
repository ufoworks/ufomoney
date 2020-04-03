<template>
  <div>
    <div class="flex items-center text-brand mb-6">
      <svgicon name="filters" width="18" height="18" class="mr-3"></svgicon>
      <p class="font-brand font-bold text-sm leading-none">Filters</p>
    </div>
    <div class="mb-4">
      <p class="mb-1 font-bold">Date range</p>
      <range-date-picker
        v-model="dateSelected"
        :date-shortcuts="dateShortcuts"
        input-class="input-text w-full"
        class="rangepicker"
      />
    </div>
    <div class="mb-4">
      <p class="mb-1 font-bold">Client</p>
      <custom-select>
        <select name="client" class="w-full" v-model="selectedClient">
          <option value="">All clients</option>
          <option v-for="client in clients" :value="client.id" :key="client.id">{{ client.name }}</option>
        </select>
      </custom-select>
    </div>
    <div class="mb-4">
      <p class="mb-1 font-bold">Status</p>
      <vue-pills :options="statusOptions" v-model="status" />
    </div>
    <div class="flex justify-end mt-8">
      <button class="btn-brand text-sm" @click="setFilters">Apply filters</button>
    </div>
  </div>
</template>

<script>
import RangeDatePicker from '../components/RangeDatePicker'
import CustomSelect from '../components/CustomSelect'
import VuePills from '../components/VuePills'
import { subYears, startOfMonth, subMonths, startOfYear } from 'date-fns'
import { mapMutations } from 'vuex'
import '../components/icons/filters'
import CLIENTS_QUERY from '../graphql/Clients.gql'
export default {
  components: { RangeDatePicker, CustomSelect, VuePills },
  data () {
    return {
      dateSelected: null,
      dateInitValue: {
        start: subYears(new Date(), 1),
        end: new Date()
      },
      dateShortcuts: {
        'This month': {
          start: startOfMonth(new Date()),
          end: new Date()
        },
        'Last month': {
          start: subMonths(new Date(), 1),
          end: new Date()
        },
        'Last 3 months': {
          start: subMonths(new Date(), 3),
          end: new Date()
        },
        'This year': {
          start: startOfYear(new Date()),
          end: new Date()
        },
        'Last year': {
          start: subYears(new Date(), 1),
          end: new Date()
        }
      },
      selectedClient: '',
      status: '',
      statusOptions: [
        { value: '', label: 'Any' },
        { value: 'accepted', label: 'Accepted' },
        { value: 'rejected', label: 'Rejected' }
      ]
    }
  },
  apollo: {
    clients: {
      query: CLIENTS_QUERY,
      fetchPolicy: 'cache-and-network'
    }
  },
  created () {
    this.dateSelected = this.dateInitValue
  },
  mounted () {
    this.setFilters()
  },
  methods: {
    ...mapMutations('filters', ['setBudgetFilters']),
    setFilters () {
      const filters = {
        date: { ...this.dateSelected },
        client: this.selectedClient,
        status: this.status
      }
      this.setBudgetFilters(filters)
    }
  }
}
</script>
