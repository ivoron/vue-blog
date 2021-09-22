<template>
  <div class="app" @click.stop="showModal = false">
    <h2 class="postList">История постов</h2>
    <my-modal :show="showModal">
      <post-form @create="createPost" />
    </my-modal>
    <div class="app__direct">
      <my-button @click.stop="showModal = true">Добавить пост</my-button>
      <my-input placeholder="Поиск..." v-model="searchQuery" />
    </div>
    <h3 class="postList" v-if="isLoading">Получение данных от сервера...</h3>
    <post-list
      v-else
      :posts="sortedSearchedPosts"
      @remove="removePost"
      :sortOptions="sortOptions"
      :sortType="sortType"
      @sortPosts="sortPosts"
    />
  </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import axios from "axios";
export default {
  components: {
    PostList,
    PostForm,
  },
  data() {
    return {
      posts: [],
      showModal: false,
      isLoading: false,
      sortType: "default",
      searchQuery: "",
      currentPage: 1,
      limit: 10,
      totalPages: 0,
      sortOptions: [
        { value: "title", name: "По заголовку" },
        { value: "body", name: "По содержимому" },
      ],
    };
  },
  methods: {
    createPost(newPost) {
      this.posts.unshift(newPost);
      this.showModal = false;
    },
    sortPosts(sortType) {
      this.sortType = sortType;
    },
    removePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id);
    },
    async fetchPosts() {
      try {
        this.isLoading = true;
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts/",
          {
            params: {
              _page: this.currentPage,
              _limit: this.limit,
            },
          }
        );
        this.posts = response.data;
        this.isLoading = false;
        this.totalPages = Math.ceil(
          response.headers["x-total-count"] / this.limit
        );
      } catch (e) {
        console.log(e);
      }
    },
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    sortedPost() {
      return [...this.posts].sort((post1, post2) =>
        post1[this.sortType]?.localeCompare(post2[this.sortType])
      );
    },
    sortedSearchedPosts() {
      return this.sortedPost.filter((post) =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.app__direct input {
  max-width: 200px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid mediumorchid;
}
</style>
