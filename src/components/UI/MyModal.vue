<template>
  <div v-if="show" class="modal">
    <div class="modal__content" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "my-modal",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style>
.modal {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
}
.modal__content {
  margin: auto;
  background: white;
  border-radius: 5px;
  min-width: 350px;
  min-height: 150px;
}
.modal__content input {
  margin: 5px 0;
  min-width: 100%;
}
</style>
