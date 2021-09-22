<template>
  <form class="form" @submit.prevent>
    <h5>Новый пост</h5>
    <my-input placeholder="Название поста" v-model="newPost.title" />
    <my-input placeholder="Описание поста" v-model="newPost.body" />
    <my-buttton class="btn" @click="createPost">Добавить пост</my-buttton>
  </form>
</template>

<script>
export default {
  data() {
    return {
      newPost: {
        title: "",
        body: "",
      },
    };
  },
  methods: {
    createPost() {
      if (!this.newPost.title.trim() || !this.newPost.body.trim()) {
        return false;
      }
      this.newPost.id = Date.now();
      this.$emit("create", this.newPost);
      this.newPost = {
        title: "",
        body: "",
      };
    },
  },
};
</script>

<style scoped>
.form {
  border: 2px solid rgb(224, 99, 255);
  display: flex;
  flex-direction: column;
  padding: 5px;
  margin: 10px;
}
</style>
