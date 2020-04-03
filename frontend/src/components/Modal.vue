<template>
  <transition name="fade" appear>
    <div class="modal">
      <div class="bg" @click="$emit('close')"></div>
      <div class="window">
        <button class="close" @click="$emit('close')">
          <svgicon name="close" width="20" height="20" class="icon"></svgicon>
        </button>
        <div class="content">
          <slot />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import './icons/close'
export default {
  name: 'modal',
  mounted () {
    disableBodyScroll(this.$el)
  },
  beforeDestroy () {
    enableBodyScroll(this.$el)
  }
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1050;
  outline: 0;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 2rem;
}
.bg {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(200, 200, 200, 0.75);
  z-index: 0;
}
.window {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  box-shadow: 0 4px 12px 0 rgba(118, 118, 118, .4);
  padding-top: 3rem;
  background-color: #fff;
  z-index: 1;
}
.close {
  position: absolute;
  top: 0.75rem;
  right: 1rem;
}
@media print {
  .content {
    visibility: visible;
  }
}
</style>
<style>
@media print {
  body > * {
    visibility: hidden;
  }
}
</style>
