<template>
  <section>
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
};
</script>

<style>
</style>