<template>
  <section>
    <p>List of tasks</p>
    <ul v-for="task in this.$store.getters.getAllTasks" :key="task._id">
      <base-task
        :key="task._id"
        :completed="task.completed"
        :description="task.description"
      >
      </base-task>
    </ul>
  </section>
</template>

<script>
// import axios from "axios";
import BaseTask from "./BaseTask.vue";

export default {
  components: { BaseTask },
  created() {
    this.getAllTasks();
  },
  methods: {
    getAllTasks() {
     this.$store.dispatch('getAllTasks');
    },
  },
};
</script>

<style>
</style>