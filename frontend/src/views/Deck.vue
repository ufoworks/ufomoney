<template>
  <div class="base">
    <transition name="slidefulldown" appear>
      <header :class="['header', { 'scroll': notOnTop }]">
        <div class="flex items-end">
          <div class="pb-4 mr-20">
            <ufo width="128" height="40"/>
          </div>
          <main-menu />
        </div>
        <div class="flex items-center">
          <div class="text-right">
            <p class="font-brand font-bold text leading-none">Hello, {{ user.username }}</p>
            <button @click="handleLogout" class="text-brand font-bold text-sm color-link--brand">Logout</button>
          </div>
        </div>
      </header>
    </transition>
    <transition name="slideup" mode="out-in" appear>
      <router-view :key="routeKey"></router-view>
    </transition>
    <notifications />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import '../components/icons/budget'
import '../components/icons/invoice'
import '../components/icons/client'
import Ufo from '../components/ufo'
import MainMenu from '../components/MainMenu'
export default {
  name: 'deck',
  components: {
    Ufo,
    MainMenu
  },
  data () {
    return {
      notOnTop: false
    }
  },
  mounted () {
    window.addEventListener('scroll', this.checkScroll)
    this.checkScroll()
  },
  computed: {
    ...mapState('user', {
      user: state => state.user
    }),
    routeKey () {
      const idx = this.$route.matched.length <= 1 ? 0 : 1
      return this.$route.matched[idx].path
    },
    asideComponent () {
      let result
      switch (this.$route.name) {
        case 'budgets':
          result = 'budget-filters'
          break
        default:
          result = 'span'
          break
      }
      return result
    }
  },
  methods: {
    ...mapActions('user', ['logout']),
    handleLogout () {
      this.logout()
      this.$router.push({ name: 'login' })
    },
    checkScroll () {
      const threshold = 50
      const docScroll = window.pageYOffset || document.documentElement.scrollTop
      if (docScroll > threshold) {
        this.notOnTop = true
      } else {
        this.notOnTop = false
      }
    }
  }
}
</script>
<style lang="postcss" scoped>
.header {
  @apply fixed z-10 top-0 left-0 w-full flex justify-between px-12 bg-white border-b border-gray h-20;
  transition: all 0.5s ease;
}
.header.scroll {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.25);
  border-color: transparent;
}
</style>
