<template>
  <li>
   <input type="checkbox" name="completed" id="completed" v-bind="completed">
   <p>{{description}}</p>
  </li>
</template>

<script>
export default {
    props:['_id','completed','description']
};
</script>

<style>
</style>