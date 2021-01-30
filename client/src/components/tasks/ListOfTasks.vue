<template>
  <section>
    <p>List of tasks</p>
    <ul v-for="task in tasks[0]" :key="task._id">
      <base-task
        :key="task._id"
        :id="task._id"
        :completed="task.completed"
        :description="task.desription"
      >
      </base-task>
    </ul>
    <button @click="getTasks">get</button>
  </section>
</template>

<script>
import axios from "axios";
import BaseTask from "./BaseTask.vue";

export default {
  components: { BaseTask },
  data() {
    return {
      tasks: [],
      token: this.$store.getters.token,
    };
  },
  methods: {
    getTasks() {
      if (this.token === null) {
        this.$router.replace("/");
      }
      axios
        .get("http://localhost:3000/tasks", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((response) => {
          this.tasks = response.data;
          console.log(this.tasks);
        });
    },
  },
};
</script>

<style>
</style>