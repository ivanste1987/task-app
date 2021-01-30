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
    {{ this.error }}
  </section>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      error: "",
    };
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch("login", { ...this.user });
        this.$router.replace("/todo");
      } catch (err) {
        if(err){
          this.error = "Your email or password is wrong, please try again.";
        }
        
      }
    },
    
  },
};
</script>

<style>
</style>