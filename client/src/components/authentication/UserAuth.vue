<template>
  <section class="singin-singup sing-in-form">
    <form @submit.prevent="login" autocomplete="off">
      <h2>Sign in</h2>
      <div class="input-field">
        <i class="fas fa-at"></i
        ><input
          type="email"
          name="email"
          id="userEmail"
          placeholder="email"
          v-model="this.user.email"
          @focus="this.error = ''"
        />
      </div>
      <div class="input-field">
        <i class="fas fa-unlock"></i
        ><input
          type="password"
          name="password"
          id="userPassword"
          placeholder="password"
          v-model="this.user.password"
          @focus="this.error = ''"
        />
      </div>
      <p class="error">{{ this.error }}</p>
      <button type="submit" class="btn">Sing in</button>
    </form>
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
        await this.$store.dispatch("login", this.user);
        this.$router.replace("/tasks");
      } catch (err) {
        if (err) {
          this.error = "Your email or password is wrong, please try again.";
        }
      }
    },
  },
};
</script>

<style lang="scss">
.error {
  color: red;
}
</style>