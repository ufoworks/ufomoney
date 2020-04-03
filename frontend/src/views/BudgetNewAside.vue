<template>
  <div>
    <button class="btn-brand w-full" @click="save" :disabled="sending">{{ buttonText }}</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { EventBus } from '../event-bus'
export default {
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
    }
  }
}
</script>
