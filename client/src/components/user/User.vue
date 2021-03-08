<template>
  <div class="user">
      <ul>
        <h5>User info</h5>

        <li>
          <label>Name:</label>
          <label v-if="!change" for="name">{{ name }}</label>
          <input
            type="text"
            id="name"
            :placeholder="name"
            v-model="this.editName"
            v-if="change"
          />
        </li>
        <li>
          <label>Age: </label>
          <label v-if="!change" for="age">{{ age }}</label>
          <input
            type="text"
            name="age"
            id="age"
            :placeholder="age"
            v-model="this.editAge"
            v-if="change"
          />
        </li>
        <li>
          <label>Email: </label>
          <label v-if="!change" for="email">{{ email }}</label>
          <input
            type="email"
            name="email"
            id="email"
            :placeholder="email"
            v-model="this.editEmail"
            v-if="change"
          />
        </li>
        <li>
          <label v-if="change">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            :placeholder="password"
            v-model="this.editPassword"
            v-if="change"
          />
        </li>
      </ul>
    <div class="buttons">
      <button v-if="change" @click="updateUser()" class="btn">Update</button>
      <button @click="this.edit()" class="btn" :value="change">
        {{ !change ? "Edit" : "Close" }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["name", "password", "email", "age"],
  data() {
    return {
      change: false,
      editName: this.name,
      editAge: this.age,
      editEmail: this.email,
      editPassword: this.password,
    };
  },
  methods: {
    edit() {
      this.change = !this.change;
    },
    updateUser() {
      this.edit();
      this.$emit(
        "update-user",
        this.editName,
        this.editAge,
        this.editEmail,
        this.editPassword
      );
    },
  },
};
</script>

<style>
</style>