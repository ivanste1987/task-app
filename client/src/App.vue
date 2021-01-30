<template>
  <section>
    <router-view />
  </section>
</template>

<script>
export default {
  data() {
    return {
      isLoggedin:  this.$store.getters.isLoggedin,
      token: this.$store.getters.token,
    };
  },
  created() {
   this.$store.dispatch('stayLoggedin');
  },

};
</script>
<style lang="scss">
body {
    display: flex;
    margin: 0;
    width: 100%;
    height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  padding: 0;
  margin: 0;
  width: 100%;
}
</style>
