<template>
  <div class="date-picker">
    <input ref="input" type="text" :value="formatValue" readonly class="date-picker__input">
    <div class="date-picker__icon">
      <svgicon name="calendar" width="16" height="16"></svgicon>
    </div>
  </div>
</template>

<script>
import 'tiny-date-picker/tiny-date-picker.css'
import TinyDatePicker from 'tiny-date-picker'
import { format, parse } from 'date-fns'
import './icons/calendar'

const defaultOptions = {
  format (date) {
    return format(date, 'PP')
  }
}
export default {
  props: {
    value: {
      type: String
    },
    options: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  mounted () {
    TinyDatePicker(this.$refs.input, { ...defaultOptions, ...this.options })
      .on('select', this.onSelect)
  },
  computed: {
    formatValue () {
      return format(parse(this.value, 'yyyy-MM-dd', new Date()), 'PP')
    }
  },
  methods: {
    onSelect (_, dp) {
      this.$emit('input', format(dp.state.selectedDate, 'yyyy-MM-dd'))
    }
  }
}
</script>
<style lang="css" scoped>
.date-picker {
  display: flex;
  align-items: center;
}
.date-picker__input {
  flex: 1;
  margin-right: 1rem;
}
</style>
