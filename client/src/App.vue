<template>
  <section>
    <the-header></the-header>
    <router-view />
  </section>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue'
export default {
  components:{
    TheHeader
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
