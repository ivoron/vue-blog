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
  border: 2px solid rgb(224, 99, 255);
  padding: 8px;
  max-width: 150px;
  height: 30px;
  border-radius: 10px;
}
/* .input :focus {
  border: 1px solid rgb(214, 118, 238);
} */
</style>
