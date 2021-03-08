<template>
  <section class="singin-singup sign-up-form">
    <form @submit.prevent="createUser" autocomplete="off">
      <h2>Sing up</h2>
      <div class="input-field">
        <i class="fas fa-at"></i>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="email"
          v-model="this.user.email"
        />
      </div>
      <div class="input-field">
        <i class="fas fa-unlock"></i>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
          v-model="this.user.password"
        />
      </div>
      <div class="input-field">
        <i class="fas fa-signature"></i>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="name"
          v-model="this.user.name"
        />
      </div>
      <div class="input-field">
        <i class="fas fa-user-secret"></i>
        <input
          type="number"
          name="age"
          id="age"
          placeholder="age"
          v-model="this.user.age"
        />
      </div>
      <button type="submit" class="btn">Sing up</button>
    </form>

    <transition>
      <teleport to="#app">
        <the-modal v-if="close" :class="close ? 'show' : ''">
          <p>{{ this.validationMessage }}</p>
          <button @click="closeModal" class="close-btn">
            <i class="fas fa-times-circle fa-lg"></i>
          </button>
        </the-modal>
      </teleport>
    </transition>
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
      this.user.name = "",
        this.user.email =  "",
        this.user.password = "",
        this.user.age = ""
    },
    closeModal() {
      this.close = false;
    },
  },
};
</script>

<style>
</style>