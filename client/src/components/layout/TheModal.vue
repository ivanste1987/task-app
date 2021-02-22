<template>
  <dialog open>
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

<style lang='scss'>
dialog {
  position: fixed;
  z-index: 9999;
  width: 30%;
  height: auto;
  top: 1%;
  left: 40%;
  background-color: #393638;
  box-shadow: 0px 0px 8px rgba(37, 39, 36, 0.25);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 25px;
  padding: 1rem;
  text-align: center;
  transform: translateY(-101%);
  opacity: 0;

  p {
    padding: 1rem;
    text-align: center;
    color: #fff;
  }
}
.show {
 animation: show-message 0.35s ease-in-out forwards;
}
@keyframes show-message {
  0% {
    opacity: 0;
    transform: translateY(-101%);
  }
  100% {
    opacity: 1;
    transform: translateY(1%);
  }
}
</style>