<template>
  <nav class="flex relative">
    <router-link to="/budgets" ref="budgets" class="btn-menu">Budgets</router-link>
    <router-link to="/invoices" ref="invoices" class="btn-menu">Invoices</router-link>
    <router-link to="/clients" ref="clients" class="btn-menu">Clients</router-link>
    <div ref="line" class="line"></div>
  </nav>
</template>

<script>
export default {
  mounted () {
    this.$watch('$route.path', this.onRouteChange, {
      immediate: true
    })
  },
  methods: {
    onRouteChange (val) {
      const regExp = /(\w+)/gi
      const match = val.match(regExp)
      if (!match) {
        return
      }
      this.selectMenu(match[0])
    },
    selectMenu (target) {
      const $target = this.$refs[target].$el
      this.$refs.line.style.width = $target.offsetWidth + 'px'
      this.$refs.line.style.transform = `translateX(${$target.offsetLeft}px)`
    }
  }
}
</script>

<style scoped>
.btn-menu {
  position: relative;
  @apply font-brand font-bold text-lg mr-12 pb-4;
  line-height: 1;
  transition: color 0.3s ease;
}
.btn-menu:hover {
  @apply text-brand;
}
.line {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 4px;
  transition: all 0.3s theme('easings.inOutQuart');
  @apply bg-brand;
}
</style>
