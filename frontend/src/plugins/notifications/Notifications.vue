<template>
  <transition-group name="slideright" tag="ul" class="notifications">
    <notification-item
      v-for="item in items"
      :key="item.id"
      :text="item.text"
      :type="item.type"
      :actionText="item.actionText"
      :dismissAfter="item.dismissAfter"
      v-on:action="itemAction(item)"
      v-on:dismiss="itemDismiss(item)"
    />
  </transition-group>
</template>
<script>
import { findIndex } from 'lodash'
import NotificationItem from './NotificationItem.vue'

let items = []
const defaults = {
  dismissAfter: 5000,
  type: '',
  onAction: null,
  onDismiss: null
}

export default {
  components: {
    NotificationItem
  },
  data () {
    return { items }
  },
  beforeDestroy () {
    this.items.forEach(item => this.itemDismiss(item))
  },
  methods: {
    itemAction (item) {
      this.removeItem(item.id)
      item.onAction && item.onAction.call(this)
    },
    itemDismiss (item) {
      this.removeItem(item.id)
      item.onDismiss && item.onDismiss.call(this)
    },
    removeItem (id) {
      const index = findIndex(items, el => el.id === id)
      items.splice(index, 1)
    }
  },
  install (Vue, options = {}) {
    Vue.component('notifications', this)

    Vue.prototype.$addNotification = (item) => {
      item.id = Date.now()
      items.push(Object.assign({}, defaults, options, item))
    }
  }
}
</script>
<style lang="postcss" scoped>
.notifications {
  position: fixed;
  left: 0.5rem;
  bottom: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
  z-index: 100;
}
</style>
