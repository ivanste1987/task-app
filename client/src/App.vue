<template>
  <section id="main-content">
    <router-view />
  </section>
</template>

<script>
export default {
  data() {
    return {
      isLoggedin: this.$store.getters.isLoggedin,
      token: this.$store.getters.token,
    };
  },
  created() {
    this.$store.dispatch("stayLoggedin");
  },
};
</script>
<style lang="scss">
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
html,
body,
#main-content {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;overflow: hidden;
}
body {
  display: flex;
}

#app {
  font-family: "Open Sans", sans-serif;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  background-color: #fefefe;
  color: #373638;
  #main-content {
    display: flex;
  }
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  color: #373638;
  text-transform: uppercase;
}
h1 {
  font-size: 2.5rem;
}
h2 {
  font-size: 1.9rem;
}
h3 {
  font-size: 1.7rem;
}
h4 {
  font-size: 1.5rem;
}
h5 {
  font-size: 1.3rem;
}
h6 {
  font-size: 1.1rem;
}
strong{
  color: #fff;
}
p,
li,
a,
i,
span,
label,
input,
button,
strong{
  font-family: "Open Sans", sans-serif;
  font-size: 1rem;
}
</style>
