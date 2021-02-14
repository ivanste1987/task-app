<template>
  <li>
    <div>
      <input
        type="checkbox"
        class="checkbox"
        @click="changeStatus(_id)"
        :checked="completed"
      />
      <label for="description" v-if="readonly">{{ description }}</label>
      <input
        type="text"
        class="description"
        name="description"
        :placeholder="description"
        v-model="this.editDescription"
        v-if="!readonly"
      />
      <button @click="update(_id)" v-if="!readonly">ok</button>
      <button @click="edit()" v-if="!readonly">Cancel</button>

      <button @click="deleteTask(_id)">Delete</button>
      <button @click="edit()">Update</button>
    </div>
  </li>
</template>

<script>
export default {
  props: ["_id", "completed", "description"],
  data() {
    return {
      readonly: true,
      editDescription: null,
    };
  },
  methods: {
    deleteTask() {
      this.$emit("delete-task", this._id);
    },
    update() {
      this.edit();
      this.$emit("update-task", this._id, this.editDescription);
    },
    changeStatus() {
      this.$emit("change-status", this._id, this.completed);
    },
    edit() {
      this.readonly = !this.readonly;
    },
  },
};
</script>

<style>
</style>