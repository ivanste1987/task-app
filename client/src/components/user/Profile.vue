<template>
  <div class="userProfile">
    <div class="imgBtns">
      <div class="modalFile">
        <img
          :src="userImage"
          v-if="provideUser.avatar"
          alt="Avatar"
          class="userAvatar"
        />
        <div class="fileHolder" v-if="!provideUser.avatar">
          <input type="file" @change="fileChange" class="fileInput" />
        </div>
      </div>

      <div>
        <button @click="deleteAvatar" class="btnImg">
          <i class="far fa-trash-alt fa-2x"></i>
        </button>
      </div>
    </div>
    <div class="userContent">
      <div class="userInfo">
        <user
          :key="provideUser._id"
          :name="provideUser.name"
          :age="provideUser.age"
          :email="provideUser.email"
          :password="provideUser.password"
          @update-user="updateUser"
        ></user>
        <div class="task-container">
          <div class="col">
            <h5>Active Tasks</h5>
            <h1><b>{{ tasks.length - tasksCompleted }}</b></h1>
          </div>
          <div class="col">
            <h5>Finished Tasks</h5>
            <h1>
              <b>{{ tasksCompleted }}</b>
            </h1>
          </div>
          <div class="col">
            <h5>Total Tasks</h5>
            <h1>
              <b>{{ tasks.length }}</b>
            </h1>
          </div>
        </div>
      </div>
      <div class="userProgress">
        <div class="progress">
          <h5>Progress:</h5>
          <progress id="file" :max="tasks.length" :value="tasksCompleted">70%</progress>
        </div>
      </div>
    </div>
    <transition>
      <teleport to="#app">
        <the-modal v-if="close" :class="close ? 'show' : ''">
          <strong>{{ this.validationMessage }}</strong>
          <strong>{{ message }}</strong>
          <button @click="closeModal" class="close-btn">
            <i class="fas fa-times-circle fa-lg"></i>
          </button>
        </the-modal>
      </teleport>
    </transition>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import User from "./User.vue";
import TheModal from "../layout/TheModal.vue";
export default {
  components: {
    User,
    TheModal,
  },
  data() {
    return {
      avatarImage: null,
      selectedFile: null,
      message: null,
      user: {},
      close: false,
      completed: 0,
      uncompleted: [],
    };
  },
  created() {
    this.getUser();
    this.getTasks();
    this.setTasks();
  },

  computed: {
    ...mapGetters([
      "provideUser",
      "userToken",
      "userImage",
      "responseMessage",
      "tasks",
      "tasksCompleted"
    ]),
    validationMessage() {
      return this.$store.getters.responseMessage;
    },
  },
  methods: {
    getUser() {
      this.$store.dispatch("getUser");
    },
    getTasks() {
      this.$store.dispatch("allTasks");
    },
    setTasks() {

    },
    fileChange(event) {
      this.selectedFile = event.target.files[0];
      this.addAvatar();
    },
    addAvatar() {
      this.close = true;
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
      this.close = true;
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
    closeModal() {
      this.close = false;
    },
  },
};
</script>
<style lang="scss">
.userProfile {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .imgBtns::before {
    content: "";
    width: 100%;
    height: 125px;

    position: absolute;
    top: 0;
    left: 0;
    padding-top: 0.5rem;
    background: url("/images/sing-up.png");
    background-position: center;
  }
  .imgBtns {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 0.5rem;
    .modalFile {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      width: 15rem;
      height: 15rem;

      .userAvatar,
      .fileInput,
      .fileHolder {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        border-radius: 50%;
        border: 0.3rem solid #fff;
        cursor: pointer;
      }
      .fileHolder {
        background: rgba(255, 255, 255, 0.2);
        background-image: url("/images/plus.png");
        background-size: 50px;
        background-repeat: no-repeat;
        background-position: center;
        transition: opacity 0.5s ease-in-out;
      }
      .fileInput {
        opacity: 0;
        border: 0.3rem solid #fff;
      }
      &:hover .fileHolder {
        opacity: 0;
      }
    }

    .btnImg {
      outline: none;
      border: none;
      background-color: transparent;
      padding: 0.5rem;
      cursor: pointer;
      i {
        color: #61a3fa;
      }
    }
  }
  .userContent {
    display: flex;
    position: relative;
    flex-direction: column;
    max-width: 700px;
    width: 100%;
    .userInfo,
    .userProgress {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      width: 100%;
      height: auto;
      @media screen and (max-width) {
        flex-direction: column;
      }
      .task-container,
      .user {
        min-width: 200px;
        width: 48%;
        height: auto;
        margin: 1%;
        flex: 1;
        border-radius: 1rem;
        @media screen and (max-width: 750px) {
          width: 100%;
        }
        p {
          word-break: break-all;
        }
      }
      .task-container {
        padding: 0;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        .col {
          box-shadow: 0px 0px 6px #ccc;
          border-radius: 1rem;
          width: 48%;
          height: 48%;
          padding: 1rem;
          margin: 1%;
          h5 {
            margin-bottom: 1rem;
          }
          h1 {
            color: #78b8ff;
          }
          @media screen and (max-width: 400px) {
            width: 100%;
          }
        }
      }

      .user {
        padding: 1rem;
        box-shadow: 0px 0px 6px #ccc;
        display: flex;
        flex-direction: column;

        ul {
          padding-bottom: 1rem;
          li {
            display: flex;
            flex-direction: column;
            height: 60px;
            box-shadow: 0 4px 2px -4px #ccc;

            margin-bottom: 0.4rem;
            :nth-child(1) {
              color: #78b8ff;
              font-weight: 600;
            }
            label {
              margin: 1% 0 1%;
            }
            input {
              margin: 1% 0 1%;
              border: none;
              outline: none;
              background: transparent;
              color: #cccccc;
            }
          }
        }
        .buttons {
          display: flex;
          flex-direction: row;
          button {
            margin: 0 1% 0 0;
          }
        }
      }
    }
    .progress {
      box-shadow: 0px 0px 6px #ccc;
      width: 100%;
      height: auto;
      margin: 1%;
      flex: 1;
      border-radius: 1rem;
      display: flex;
      flex-direction: column;
      padding: 1rem;
      h5 {
        margin-bottom: 1rem;
      }
      progress {
        border-radius: 7px;
        padding: 0.1rem;
        width: 100%;
        height: 2rem;
      }
      progress::-webkit-progress-bar {
        background-color: #cccccc;
        border-radius: 7px;
      }
      progress::-webkit-progress-value {
        background-color: #78b8ff;
        border-radius: 7px;
        box-shadow: 1px 1px 5px 2px #61a3fa;
      }
    }
  }
}
</style>