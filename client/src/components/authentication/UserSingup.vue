<template>
  <section>
    <h2>Singup componenet</h2>
    <form @submit.prevent="createUser">
      <input
        type="email"
        name="email"
        id="email"
        placeholder="email"
        v-model="this.user.email"
      />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="password"
        v-model="this.user.password"
      />
      <input
        type="text"
        name="name"
        id="name"
        placeholder="name"
        v-model="this.user.name"
      />
      <input
        type="text"
        name="age"
        id="age"
        placeholder="age"
        v-model="this.user.age"
      />
      <button type="submit">Create user</button>
    </form>
    <h1>{{ this.validationMessage }}</h1>
  </section>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
        age: "",
      },
      validForm: null,
    };
  },
  computed:{
    validationMessage(){
        return this.$store.getters.sendMessage.userError
    }
  },
  methods: {
    createUser() {
        this.$store.dispatch("createUser", this.user);
    },
  },
};
</script>

<style>
</style>