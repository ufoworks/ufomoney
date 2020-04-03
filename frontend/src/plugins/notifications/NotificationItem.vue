<template>
  <li :class="itemClass">
    <span>{{ text }}</span>
    <button @click="onAction">{{ actionText }}</button>
  </li>
</template>
<script>
let destroyInterval
export default {
  props: ['text', 'type', 'actionText', 'dismissAfter'],
  mounted () {
    if (this.dismissAfter) {
      destroyInterval = setTimeout(
        () => this.$emit('dismiss'),
        this.dismissAfter
      )
    }
  },
  computed: {
    itemClass () {
      return `notifications__item ${this.type}`
    }
  },
  methods: {
    onAction () {
      clearInterval(destroyInterval)
      this.$emit('action')
    }
  }
}
</script>
<style lang='postcss' scoped>
.notifications__item {
  display: block;
  border-radius: 5px;
  padding: 0.75rem 1rem;
  background-color: #263037;
  color: white;
  margin-top: 0.25rem;
}
.notifications__item > button {
  display: inline-block;
  margin-left: 0.5rem;
  @apply text-brand;
  font-weight: bold;
  text-decoration: underline;
}
.notifications__item.error {
  background-color: #fc4200;
}
.notifications__item.error > button {
  color: white;
}
</style>
