<template>
  <section>
    <div id="nav">
      <router-link to="/">Login</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </section>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
