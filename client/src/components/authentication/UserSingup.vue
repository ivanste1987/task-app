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
    <teleport to="body">
      <the-modal v-if="close" >
        {{this.validationMessage}}
        <button @click="closeModal">Okey</button>
      </the-modal>
    </teleport>
  </section>
</template>

<script>
import TheModal from "../layout/TheModal.vue";

export default {
  components: { TheModal },
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
        age: "",
      },
      validForm: null,
      close: false,
    };
  },
  computed: {
    validationMessage() {
      return this.$store.getters.sendMessage;
    },
  },
  methods: {
    createUser() {
      this.close = true;
      this.$store.dispatch("createUser", this.user);
    },
    closeModal() {
      this.close = false;
    },
  },
};
</script>

<style>
</style>