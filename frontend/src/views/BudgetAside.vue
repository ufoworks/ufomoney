<template>
  <div>
    <button class="btn-brand w-full" @click="save" :disabled="sending">{{ buttonText }}</button>
    <hr class="border-0 border-b border-brand my-8 opacity-50">
     <div class="flex items-center text-brand mb-6">
      <svgicon name="pdf" width="18" height="22" class="mr-3"></svgicon>
      <p class="font-brand font-bold text-sm leading-none">PDF</p>
    </div>
    <div class="mb-4">
      <p class="mb-1 font-bold">Language</p>
      <vue-pills :options="langOptions" v-model="lang" />
    </div>
    <div class="mb-4">
      <p class="mb-1 font-bold">Currency</p>
      <vue-pills :options="currencyOptions" v-model="currency" />
    </div>
    <div class="mb-8">
      <p class="mb-1 font-bold">Taxes</p>
      <vue-pills :options="taxesOptions" v-model="taxes" />
    </div>
    <button class="btn-brand w-full" @click="print">View & Print</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import VuePills from '../components/VuePills'
import '../components/icons/pdf'
import { EventBus } from '../event-bus'
export default {
  components: { VuePills },
  data () {
    return {
      lang: 'es',
      langOptions: [
        { value: 'es', label: 'Spanish' },
        { value: 'en', label: 'English' }
      ],
      currency: 'euro',
      currencyOptions: [
        { value: 'euro', label: 'Euro' },
        { value: 'dollar', label: 'Dollar' }
      ],
      taxes: true,
      taxesOptions: [
        { value: true, label: 'Yes' },
        { value: false, label: 'No' }
      ]
    }
  },
  computed: {
    ...mapState('loading', {
      sending: state => state.budgetDetail
    }),
    buttonText () {
      return this.sending ? 'Saving...' : 'Save'
    }
  },
  methods: {
    save () {
      EventBus.$emit('save-budget')
    },
    print () {
      EventBus.$emit('print-budget', {
        lang: this.lang,
        currency: this.currency,
        taxes: this.taxes
      })
    }
  }
}
</script>

<style scoped>

</style>
