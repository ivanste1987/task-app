<template>
  <header>
    <ul>
      <slot></slot>
      <li><button @click="logout">Logout</button></li>
      <li><button @click="logoutAll">Logout from all devices</button></li>
    </ul>
  </header>
</template>

<script>
//import axios from 'axios';
export default {
  data() {
    return {
      isLoggedin: this.$store.getters.isLoggedin,
    };
  },
  created() {},
  computed: {},
  methods: {
    logout() {
      this.$router.push("/");
      this.$store.dispatch("logout");
    },
    logoutAll() {
      this.$store.dispatch("logoutAll");
      this.$router.replace("/");
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  width: 100%;
  padding: 1rem;
  background: gray;
  display: flex;
  justify-content: center;
  align-items: center;
  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    list-style-type: none;

    li {
      margin: 1rem;
    }
  }
}
</style>