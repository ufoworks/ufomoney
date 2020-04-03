<template>
  <div class="vrpd">
    <input ref="display" type="text" :class="['vrdp-picker', inputClass]" v-model="displayValue">
    <div ref="picker" class="vrdp-calendar" :class="{'show': isShowPicker}">
      <div ref="calendar"></div>
      <div v-if="dateShortcuts" class="vrdp-shortcuts">
        <ul>
          <li v-for="(shortcut, key) in dateShortcuts" :key="key">
            <a href="#" @click.prevent="onClickShortCut(shortcut)">{{ key }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import 'tiny-date-picker/tiny-date-picker.css'
import 'tiny-date-picker/date-range-picker.css'
import { DateRangePicker } from 'tiny-date-picker/dist/date-range-picker'
import { format } from 'date-fns'
export default {
  props: {
    value: {
      type: Object
    },
    startOpts: {
      type: Object,
      default () {
        return {}
      }
    },
    endOpts: {
      type: Object,
      default () {
        return {}
      }
    },
    inputClass: {
      type: String
    },
    dateShortcuts: {
      type: Object
    }
  },
  data () {
    return {
      datePicker: null,
      isShowPicker: false,
      currentValue: this.value,
      displayValue: '',
      previousTimeout: null
    }
  },
  mounted () {
    this.$refs.display.addEventListener('focus', this.onFocus)
    this.$el.addEventListener('focusout', this.onFocusOut)
    this.datePicker = DateRangePicker(this.$refs.calendar, {
      startOpts: this.startOpts,
      endOpts: this.endOpts
    })
    this.datePicker.on('statechange', this.onPickerStateChange)
    this.datePicker.setState(this.value)
  },
  methods: {
    onPickerStateChange (_, rp) {
      const range = rp.state
      this.displayValue = `${range.start ? format(range.start, 'P') : ''} > ${range.end ? format(range.end, 'P') : ''}`
      this.currentValue = rp.state
      this.$emit('input', this.currentValue)
      if (range.start && range.end) {
        this.isShowPicker = false
      }
    },
    onFocus () {
      this.isShowPicker = true
    },
    onFocusOut () {
      clearTimeout(this.previousTimeout)
      this.previousTimeout = setTimeout(() => {
        if (!this.$el.contains(document.activeElement)) {
          this.isShowPicker = false
        }
      }, 10)
    },
    onClickShortCut (value) {
      this.datePicker.setState(value)
    }
  }
}
</script>

<style scoped>
  .vrpd {
    position: relative;
  }
  .vrdp-calendar {
    position: absolute;
    z-index: 10;
    top: 100%;
    right: 0;
    display: flex;
    margin-top: 10px;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease;
    box-shadow: 0 0 32px -16px rgba(0, 0, 0, 0.5);
    background-color: #fff;
  }
  .vrdp-calendar.show {
    pointer-events: all;
    opacity: 1;
  }
  .vrdp-calendar /deep/ .dr-cals {
    padding-top: 0;
    box-shadow: none;
  }
  .vrdp-calendar /deep/ .dr-cals::before {
    content: none;
  }
  .vrdp-shortcuts {
    padding: 1rem;
    width: 175px;
    background-color: #fbfbfb;
    font-size: 0.9rem;
    font-weight: bold;
    color: #3b99fc;
  }
  .vrdp-shortcuts ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
</style>
