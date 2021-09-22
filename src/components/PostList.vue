<template>
  <div v-if="posts.length">
    <div class="app__direct">
      <h3 class="postList">Список постов:</h3>
      <my-select
        v-model="sortType"
        @change="$emit('sortPosts', sortType)"
        :sortOptions="sortOptions"
        :sortType="sortType"
      ></my-select>
    </div>
    <transition-group name="list">
      <post-item
        v-for="post of posts"
        :post="post"
        :key="post.id"
        @remove="$emit('remove', post)"
    /></transition-group>
  </div>
  <div v-else><h3 class="postList">Постов пока нет</h3></div>
</template>

<script>
import PostItem from "@/components/PostItem";
export default {
  components: {
    PostItem,
  },
  props: {
    posts: {
      type: Array,
      required: true,
    },
    sortOptions: {
      type: Array,
      required: true,
    },
    sortType: {
      type: String,
    },
  },
};
</script>

<style>
.postList {
  margin: 10px;
}
.app__direct {
  display: flex;
  justify-content: space-between;
  margin-right: 10px;
}
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.list-move {
  transition: transform 0.6s ease;
}
</style>
