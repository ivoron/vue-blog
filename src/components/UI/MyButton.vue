<template>
  <button class="btn"><slot></slot></button>
</template>
<script>
export default {
  name: "my-button",
};
</script>
<style>
.btn {
  padding: 5px 10px;
  background: none;
  align-self: center;
  border: 2px solid rgb(224, 99, 255);
}
</style>
