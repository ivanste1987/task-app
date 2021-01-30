<template>
  <section v-if="this.isLoggedin">
    <the-header>
   <li> <router-link to="/tasks">Tasks</router-link></li>
    <li><router-link to="/profile">Profile</router-link></li>
    </the-header>
    <router-view></router-view>
  </section>
</template>

<script>
import TheHeader from '../components/layout/TheHeader.vue';
export default {
  components: { TheHeader },
  data() {
    return {
      isLoggedin:  this.$store.getters.isLoggedin,
      token: this.$store.getters.token,
    };
  },
};
</script>

<style>
</style>