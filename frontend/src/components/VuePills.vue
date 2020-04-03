<template>
  <div class="wrapper">
    <div
      v-for="(item, idx) in options"
      :key="idx"
      :ref="item.value"
      @click="select(item.value)"
      :class="['item', { 'active': item.value === selected }]">
      {{ item.label }}
    </div>
    <div ref="pill" class="pill"></div>
  </div>
</template>

<script>
export default {
  name: 'vue-pills',
  props: {
    value: [String, Boolean],
    options: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      selected: this.value
    }
  },
  mounted () {
    this.select(this.value)
    window.addEventListener('resize', () => (this.select(this.selected)))
  },
  destroyed () {
    window.removeEventListener('resize', () => (this.select(this.selected)))
  },
  methods: {
    select (value) {
      this.selected = value
      this.$emit('input', value)
      const $target = this.$refs[value][0]
      if (!this.$refs.pill || !$target) {
        return
      }
      this.$refs.pill.style.width = $target.offsetWidth + 'px'
      this.$refs.pill.style.transform = `translateX(${$target.offsetLeft}px)`
    }
  }
}
</script>

<style lang="postcss" scoped>
.wrapper {
  position: relative;
  display: flex;
  background-color: #fff;
  border-radius: 100px;
}
.item {
  flex: 1;
  @apply text-sm;
  cursor: pointer;
  padding: 0.5rem 1.5rem;
  text-align: center;
  position: relative;
  z-index: 1;
  transition: color 0.5s;
}
.pill {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  border-radius: 100px;
  transition: all 0.3s theme('easings.inOutQuart');
  @apply border border-brand;
}
</style>
