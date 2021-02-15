<template>
  <div>
    <h1>This is an Profile page, for now.</h1>
    <img :src="userImage" alt="Avatar" />
    <input type="file" @change="fileChange" />
    <button @click="addAvatar">Add Picture</button>
    <button @click="deleteAvatar">Remove Picture</button>
    <p>
      <strong>{{ responseMessage }}</strong>
      <strong>{{ message }}</strong>
    </p>
    <p>User UD: {{ provideUser._id }}</p>
    <p>Validation TOKEN: {{ userToken }}</p>
    <user
      :key="provideUser._id"
      :name="provideUser.name"
      :age="provideUser.age"
      :email="provideUser.email"
      :password="provideUser.password"
      @update-user="updateUser"
    ></user>
    <button @click="deleteProfile">Delete Profile</button>
  </div>
</template>
<script>
//import axios from 'axios';
import { mapGetters } from "vuex";
import User from "./User.vue";
export default {
  components: {
    User,
  },
  data() {
    return {
      avatarImage: null,
      selectedFile: null,
      message: null,
      user: {},
    };
  },
  created() {
    this.getUser();
  },

  computed: {
    ...mapGetters(["provideUser", "userToken", "userImage", "responseMessage"]),
  },
  methods: {
    getUser() {
      this.$store.dispatch("getUser");
    },
    fileChange(event) {
      this.selectedFile = event.target.files[0];
    },
    addAvatar() {
      try {
        this.message = "";
        const formData = new FormData();
        formData.append("avatar", this.selectedFile, this.selectedFile.name);
        this.$store.dispatch("addUserImage", formData);
      } catch (error) {
        if (error) {
          this.message = "Please add image First.";
        }
      }
    },
    deleteAvatar() {
      this.$store.dispatch("deleteUserImage");
    },
    updateUser(name, age, email, password) {
      try {
        this.user = {
          name: name,
          age: age,
          email: email,
          password: password,
        };
        this.$store.dispatch("updateUserData", this.user);
      } catch (error) {
        if (error) {
          this.message = "Something went wrong, please try again later.";
        }
      }
    },
    deleteProfile() {
      this.$store.dispatch("deleteProfile");
      this.$router.push("/")
    },
  },
};
</script>
<style>
img {
  border-radius: 50%;
}
</style>