<template>
  <input :value="modelValue" @input="updateInput" class="input" type="text" />
</template>
<script>
export default {
  name: "my-input",
  props: {
    modelValue: [String, Number],
  },
  methods: {
    updateInput(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>
<style>
.input {
  width: 100%;
  border: 2px solid rgb(224, 99, 255);
  padding: 5px;
  margin-top: 5px;
  margin-right: 5px;
}
</style>
