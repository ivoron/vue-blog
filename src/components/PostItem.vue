<template>
  <div class="post">
    <div>
      <strong>{{ post.title }}</strong>
      <div>{{ post.body }}</div>
    </div>
    <my-button @click="$emit('remove', post)">Удалить</my-button>
  </div>
</template>
<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style>
.post {
  border: 2px solid rgb(224, 99, 255);
  padding: 10px;
  display: flex;
  margin-bottom: 5px;
  justify-content: space-between;
}
</style>
