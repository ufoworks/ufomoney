<template>
   <div class="list-item" @mouseenter="mouseover = true" @mouseleave="mouseover = false">
    <div class="list-item__tools">
      <ul :class="['list-item__toolsmenu', { open: mouseover }]">
        <li class="mr-3">
          <button class="color-link" v-tooltip="'Invoice'">
            <svgicon name="invoice" width="16" height="16" class="icon"></svgicon>
          </button>
        </li>
        <li class="mr-3">
          <button class="color-link" @click="$emit('accept')" v-tooltip="'Accept'">
            <svgicon name="accept" width="16" height="16" class="icon"></svgicon>
          </button>
        </li>
        <li class="mr-3">
          <button class="color-link" @click="$emit('reject')" v-tooltip="'Reject'">
            <svgicon name="reject" width="16" height="16" class="icon"></svgicon>
          </button>
        </li>
        <li class="mr-3">
          <button class="color-link" @click="$emit('copy')" v-tooltip="'Clone'">
            <svgicon name="copy" width="16" height="16" class="icon"></svgicon>
          </button>
        </li>
        <li>
          <button class="color-link" @click="$emit('delete')" v-tooltip="'Delete'">
            <svgicon name="delete" width="16" height="16" class="icon"></svgicon>
          </button>
        </li>
      </ul>
    </div>
    <div class="list-item__coverbtn" @click="$emit('detail')"></div>
    <p class="list-item__date">{{ data.date | date }}</p>
    <p class="list-item__client">{{ data.client.name }}</p>
    <p class="list-item__name">{{ data.name }}</p>
    <div
      v-if="data.status !== $root.budgetStatusType.INITIAL"
      :class="['list-item__status', { 'accepted': data.status === $root.budgetStatusType.ACCEPTED, 'rejected':  data.status === $root.budgetStatusType.REJECTED }]"
    >{{ data.status }}</div>
    <p class="list-item__currency">{{ data.tasks | reduce('amount') | currency }}</p>
  </div>
</template>

<script>
import './icons/invoice'
import './icons/accept'
import './icons/reject'
import './icons/copy'
import './icons/delete'
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      mouseover: false
    }
  }
}
</script>
