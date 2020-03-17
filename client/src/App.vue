<template>
  <div>
    <div v-if="alert.message" :class="'alert ' + alert.type">{{alert.message}}</div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      alert: state => state.alert
    })
  },
  methods: {
    ...mapActions({
      clearAlert: 'alert/clear'
    })
  },
  watch: {
    $route (to, from) {
      this.clearAlert()
    }
  }
}
</script>

<style>

</style>
