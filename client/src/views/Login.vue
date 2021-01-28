<template>
  <div>
    <h1>this is login page</h1>
    <user-auth></user-auth>
    <user-singup></user-singup>
  </div>
</template>

<script>
import UserAuth from '../components/authentication/UserAuth.vue';
import UserSingup from '../components/authentication/UserSingup.vue';
export default {
  components: {
    UserAuth,
    UserSingup
  }
}
</script>
