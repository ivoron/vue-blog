<template>
  <form class="form" @submit.prevent>
    <h5>Новый пост</h5>
    <my-input v-focus placeholder="Название поста" v-model="newPost.title" />
    <my-input placeholder="Описание поста" v-model="newPost.body" />
    <my-buttton class="btn" @click="createPost">Добавить пост</my-buttton>
  </form>
</template>

<script>
import { mapMutations } from "vuex";
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
    ...mapMutations(["addNewPost"]),
    createPost() {
      if (!this.newPost.title.trim() || !this.newPost.body.trim()) {
        return false;
      }
      this.newPost.id = Date.now();
      this.addNewPost(this.newPost);
      this.newPost = {
        title: "",
        body: "",
      };
      this.$emit("showModel");
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
