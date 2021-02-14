<template>
  <section>
    <p>List of tasks</p>
    <form @submit.prevent="addTask">
      <input
        type="text"
        name="description"
        id="description"
        v-model="this.description"
      />
      <button type="submit">Add</button>
    </form>
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
  </section>
</template>

<script>
import Task from "./Task.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    Task,
  },
  data() {
    return {
      description: null,
    };
  },
  created() {
    this.getAllTasks();
  },
  computed: {
    ...mapGetters(["tasks"]),
  },
  methods: {
    getAllTasks() {
      this.$store.dispatch("allTasks");
    },
    addTask() {
      this.task = {
        description: this.description,
      };
      this.$store.dispatch("addTask", this.task);
      this.description = null;
      this.getAllTasks();
    },
    deleteTask(id) {
      this.$store.dispatch("delete", id);
    },
    update(id, description) {
      const payload = {
        id: id,
        description: description,
      };
      this.$store.dispatch("update", payload);
    },
    changeStatus(id, completed) {
      const payload = {
        id: id,
        completed: !completed,
      };
      this.$store.dispatch("completed", payload);
    },
  },
};
</script>

<style >
ul li {
  list-style: none;
}
</style>