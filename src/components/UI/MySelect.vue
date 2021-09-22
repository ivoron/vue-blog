<template>
  <select v-model="sortType" @change="changeOption" class="app__selector">
    <option selected disabled value="default">Сортировать...</option>
    <option
      v-for="option of sortOptions"
      :key="option.value"
      :value="option.value"
      >{{ option.name }}</option
    >
  </select>
</template>
<script>
export default {
  name: "my-select",
  props: {
    sortType: {
      type: String,
    },
    sortOptions: {
      type: Array,
      default: () => [],
    },
    sortType: {
      type: String,
    },
  },
  methods: {
    changeOption(event) {
      this.$emit("update:sortType", event.target.value);
      this.$emit("sortPosts", this.sortType);
    },
  },
};
</script>
<style>
.app__selector {
  width: 150px;
  height: 25px;
  background: none;
  border: 2px solid rgb(224, 99, 255);
}
</style>
