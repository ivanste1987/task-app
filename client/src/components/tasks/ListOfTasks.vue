<template>
  <div class="list-of-task">
    <div class="newTask-container">
      <form @submit.prevent="addTask" autocomplete="off">
        <div class="input-field">
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Add a new task"
            v-model="this.description"
            @focus="this.description = ''"
          />
          <button type="submit" class="submit">
            <i class="fas fa-plus-circle fa-2x"></i>
          </button>
        </div>
      </form>
    </div>
    <ul>
      <task
        v-for="task in this.tasks"
        :key="task._id"
        :_id="task._id"
        :description="task.description"
        :completed="task.completed"
        @change-status="changeStatus"
        @delete-task="deleteTask"
        @update-task="update"
      ></task>
    </ul>

    <transition>
      <teleport to="#app">
        <the-modal v-if="modalShow" :class="modalShow ? 'show' : ''">
          <p>{{ this.validationMessage }}</p>
          <button @click="closeModal" class="close-btn">
            <i class="fas fa-times-circle fa-lg"></i>
          </button>
        </the-modal>
      </teleport>
    </transition>
  </div>
</template>

<script>
import Task from "./Task.vue";
import TheModal from "../layout/TheModal";
import { mapGetters } from "vuex";

export default {
  components: {
    Task,
    TheModal,
  },
  data() {
    return {
      description: null,
      modalShow: false,
    };
  },
  created() {
    this.getAllTasks();
  },
  computed: {
    ...mapGetters(["tasks", "taskModalMessage"]),
    validationMessage() {
      return this.$store.getters.taskModalMessage;
    },
  },
  methods: {
    getAllTasks() {
      this.$store.dispatch("allTasks");
    },
    addTask() {
      this.modalShow = true;
      this.task = {
        description: this.description,
      };
      this.$store.dispatch("addTask", this.task);
      this.description = null;
      this.getAllTasks();
    },
    deleteTask(id) {
      this.modalShow = true;
      this.$store.dispatch("delete", id);
    },
    update(id, description) {
      // try {
      this.modalShow = true;
      const payload = {
        id: id,
        description: description,
      };
      this.$store.dispatch("update", payload);
      // } catch (error) {
      //   if (error) throw error;
      // }
    },
    changeStatus(id, completed) {
      const payload = {
        id: id,
        completed: !completed,
      };
      this.$store.dispatch("completed", payload);
    },
    closeModal() {
      this.modalShow = !this.modalShow;
    },
  },
};
</script>

<style lang="scss">
.newTask-container {
  width: 100%;
  height: 125px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("/images/sing-in.png");
  background-position: center;
  form {
    width: 30rem;
    .input-field {
      width: 100%;
      height: 3.4rem;
      background: #f0f0f0;
      margin: 0.6rem 0;
      border-radius: 3.4rem;
      display: grid;
      grid-template-columns: 85% 15%;
      padding: 0 0.4rem;
      box-shadow: 0px 0px 5px 2px #ccc;
      .submit {
        text-align: center;
        border: none;
        outline: none;
        background: transparent;
        color: #61a3fa;
        transition: color 0.35s ease-in-out;
        &:hover {
          color: #78b8ff;
          cursor: pointer;
        }
      }
      input {
        outline: none;
        border: none;
        background: none;
        line-height: 3.4;
        font-weight: 400;
        color: #333333;
        padding: 0 1rem;
        ::placeholder {
          color: #aaaaaa;
          font-weight: 400;
        }
        &:focus {
          background: transparent;
        }
      }
    }
  }
}
ul li {
  list-style: none;
}
</style>