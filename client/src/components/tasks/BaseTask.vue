<template>
  <li>
    <input type="checkbox" id="completed" name="completed" :completed="completed" @emit="completed" />
    <label for="checkbox">{{ completed }}</label>
    <p>{{ description }}</p>
  </li>
</template>

<script>
export default {
  props: {
    _id: {
      type: Number,
    },
    completed: {
      type: Boolean,
    },
    description: {
      type: String,
    },
  },
};
</script>

<style>
</style>