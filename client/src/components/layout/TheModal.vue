<template>
  <dialog open>
    <header>
      <h1>Notice</h1>
    </header>
    <slot>
      <p>{{ message }}</p>
    </slot>
  </dialog>
</template>

<script>
export default {
  props: ["message"],
};
</script>

<style lang='scss' scoped>
dialog {
  position: fixed;
  width: 40%;
  top: 20vh;
  left: 30%;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  header {
    background-color: mediumaquamarine;
    text-align: left;
  }
  p {
    text-align: center;
  }
}
</style>