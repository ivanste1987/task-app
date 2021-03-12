<template>
  <header :class="show ? 'showNav' : 'hiddeNav'">
    <button @click="showNav" class="navBtn">
      <i class="fas fa-bars fa-2x"></i>
    </button>
    <figure class="avatar" >
      <img :src="userImage" alt="Avatar" @error="setAltImg"/>
      <figcaption>{{ provideUser.name }}</figcaption>
    </figure>
    <ul class="router-links">
      <li>
        <i class="fas fa-tasks fa-lg"></i
        ><router-link to="/tasks">Tasks</router-link>
      </li>
      <li>
        <i class="far fa-id-card"></i
        ><router-link to="/profile">Profile</router-link>
      </li>
    </ul>
    <ul class="actionsBtns">
      <li><button @click="logout" class="logoutBtn">Log out</button></li>
      <li>
        <button @click="logoutAll" class="logoutBtn">
          Log out all devices
        </button>
      </li>
      <li>
        <button @click="deleteProfile" class="delBtn">Delete Profile</button>
      </li>
    </ul>
  </header>
</template>

<script>
//import axios from 'axios';
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      isLoggedin: this.$store.getters.isLoggedin,
      show: false,
      displayImage: false
    };
  },
  mounted() {
    this.getUser();
  },
  computed: {
    ...mapGetters(["provideUser", "userImage"]),
    
  },
  methods: {
    getUser() {
      this.$store.dispatch("getUser");
    },
    setAltImg(event) {
      event.target.src = "https://via.placeholder.com/150";
    },
    logout() {
      this.$router.push("/");
      this.$store.dispatch("logout");
    },
    logoutAll() {
      this.$store.dispatch("logoutAll");
      this.$router.replace("/");
    },
    deleteProfile() {
      this.$store.dispatch("deleteProfile");
      this.$router.push("/");
    },
    showNav() {
      this.show = !this.show;
      this.$emit("toggle-nav", this.show);
    },
  },
};
</script>

<style lang="scss">

header {
  width: 15rem;
  min-height: 100vh;
  height: 100%;
  position: fixed;
  top: 0%;
  left: 0%;
  background-color: #373839;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  z-index: 10;
  box-shadow: 0px 0px 6px #373839;
  transform: translateX(-12rem);
  

  i {
    color: #fff;
  }
  .navBtn {
    position: absolute;
    right: 0.6rem;
    top: 0.6rem;
    background: none;
    outline: none;
    border: none;
  }
  .avatar {
    width: 50%;
    height: auto;
    margin: 35% 5%;
    color: #61a3fa;
    img {
      width: 100%;
      border-radius: 50%;
      margin-bottom: 1rem;
    }
  }
  .router-links {
    li {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      margin: 1rem 0;
      line-height: 1.4;
      translate: color 0.35s ease-in-out;
      a {
        text-decoration: none;
        margin-left: 1rem;
        color: #fff;
      }
      &:hover a {
        color: #61a3fa;
      }
      &:hover i {
        color: #61a3fa;
      }
    }
  }
  .actionsBtns {
    position: absolute;
    bottom: 2rem;
    display: flex;
    flex-direction: column;
    li {
      margin: 0.3rem;
    }
    .logoutBtn,
    .delBtn {
      border: none;
      outline: none;
      background: transparent;
      font-weight: 100;

      &:hover {
        color: #61a3fa;
        cursor: pointer;
      }
    }
    .logoutBtn {
      color: #fff;
    }
    .delBtn {
      color: red;
      &:hover {
        color: red;
      }
    }
  }
}
.showNav {
  animation: toggleNav 0.5s ease forwards;
}
@keyframes toggleNav {
  0% {
    transform: translateX(-12rem);
  }
  100% {
    transform: translateX(0);
  }
}
.hiddeNav {
  animation: toggleNavBack 0.5s ease forwards;
}
@keyframes toggleNavBack {
  0% {
    transform: translateX(0rem);
  }
  100% {
    transform: translateX(-12rem);
  }
}
</style>