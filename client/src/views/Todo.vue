<template>
  <div class="todos">
    <the-header @toggle-nav="toggleNav"></the-header>
    <router-view
      id="todos-router"
      :class="!showNav ? 'showNavRouter' : 'hiddeNavRouter'"
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
  overflow-x: hidden;
  display: flex;
  z-index: 1;
  margin: 0 auto;
  position: relative;
  //
  #todos-router {
    position: absolute;
    top: 0;
    left: 3rem;
    width: calc(100% - 3rem);
    transition: all 0.5 ease;
  }
  .showNavRouter {
    animation: toggleRouterView 0.5s ease both;
  }
  @keyframes toggleRouterView {
    0% {
      left: 3rem;
    }
    100% {
      left: 15rem;
      width: calc(100% - 15rem);
    }
  }
  .hiddeNavRouter {
    animation: toggleRouterViewBack 0.5s ease both;
  }
  @keyframes toggleRouterViewBack {
    0% {
      left: 15rem;
    }
    100% {
      left: 3rem;
      width: calc(100% - 3rem);
    }
  }
}
</style>