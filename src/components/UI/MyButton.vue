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
  margin: 10px 0px;
  padding: 5px 10px;
  background: none;
  align-self: flex-end;
  border: 2px solid rgb(224, 99, 255);
  margin-left: 10px;
}
</style>
