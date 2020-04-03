<template>
  <div class="fixed inset-0 flex items-center">
    <div class="border-l-30 border-brand pl-56">
      <ufo width="144" height="45" class="w-32 mb-8" />
      <h1 class="text-xl font-brand font-bold text-brand uppercase mb-2">Login</h1>
      <form action="#" @submit.prevent="onSubmit">
        <div class="mb-4 flex items-center">
          <label for="id" class="font-bold block w-64">Identifier</label>
          <input id="id" type="text" name="identifier" v-model="identifier" class="input-text w-full" autocomplete="name">
        </div>
        <div class="mb-6 flex items-center">
          <label for="pass" class="font-bold block w-64">Password</label>
          <input id="pass" type="password" name="password" v-model="password" class="input-text w-full" autocomplete="name">
        </div>
        <div class="flex justify-end">
          <input
            type="submit"
            :value="sending ? 'Sending...' : 'Enter'"
            :disabled="sending"
            class="btn-brand">
        </div>
        <transition-group name="fade">
          <div class="absolute mt-8 text-red font-bold" v-if="errors" key="error">
            <p v-for="error in errors" :key="error.id">{{ error.message }}</p>
          </div>
        </transition-group>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Ufo from '../components/ufo'
export default {
  components: {
    Ufo
  },
  data () {
    return {
      identifier: '',
      password: '',
      sending: false,
      errors: null
    }
  },
  methods: {
    ...mapActions('user', ['login']),
    onSubmit () {
      this.sending = true
      this.errors = null
      this.login({ id: this.identifier, pass: this.password })
        .then(() => {
          this.$router.push({ name: 'budgets' })
        })
        .catch(({ response }) => {
          this.errors = response.data.message[0].messages
        })
        .then(() => {
          this.sending = false
        })
    }
  }
}
</script>

<style scoped>
</style>
