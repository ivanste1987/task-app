<template>
  <div class="todos">
    <the-header @toggle-nav="toggleNav"></the-header>
    <router-view
      id="todos-router"
      :class="!showNav ? 'showNavRouter' : ''"
    ></router-view>
  </div>
</template>

<script>
import TheHeader from "../components/layout/TheHeader.vue";
export default {
  components: { TheHeader },
  data() {
    return {
      showNav: true,
    };
  },
  methods: {
    toggleNav() {
      this.showNav = !this.showNav;
    },
  },
};
</script>

<style lang="scss">
.todos {
  max-width: 100%;
  width: 100%;
  height: auto;
  overflow: hidden;
  display: flex;
  z-index: 1;
  margin: 0 auto;
  position: relative;
  //
  #todos-router {
    position: absolute;
    left: 3rem;
    top: 0; 
    width: calc(100% - 3rem);
    margin: 0 auto;
  }
  .showNavRouter {
    animation: toggleRouterView 0.5s ease forwards;
  }
  @keyframes toggleRouterView {
    0% {
      transform: translateX(3rem);
      
    }
    100% {
      transform: translateX(12rem);
      width: calc(100% - 12rem);
    }
  }
}
</style>