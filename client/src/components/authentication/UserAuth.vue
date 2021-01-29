<template>
  <section>
    <form @submit.prevent="login">
      <input
        type="email"
        name="email"
        id="userEmail"
        placeholder="email"
        v-model="this.user.email"
      />
      <input
        type="password"
        name="password"
        id="userPassword"
        placeholder="password"
        v-model="this.user.password"
      />
      <button type="submit">Login</button>
    </form>
    {{ this.authUser }}
  </section>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
  created() {
    this.$store.getters.userExist;
    console.log(this.$store.getters.userExist);
  },
  computed: {
    authUser() {
      const x = this.$store.state.authUser;
      console.log(x);
      return x;
    },
  },

  methods: {
    login() {
      axios
        .post("http://localhost:3000/users/login", { ...this.user })
        .then((response) => {
          console.log(response);
          localStorage.setItem("user", response.data.token);

          let user = localStorage.getItem("user");

          if (user && user.token) {
            return { Authorization: "Bearer " + user.token };
          } else {
            return {};
          }
        });
    },
  },
};
</script>

<style>
</style>