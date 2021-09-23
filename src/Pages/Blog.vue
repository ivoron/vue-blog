<template>
  <div @click.stop="showModal = false">
    <navigation></navigation>
    <h2 class="postList">История постов</h2>
    <my-modal :show="showModal">
      <post-form @create="createPost" />
    </my-modal>
    <div class="blog-header">
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
    <div ref="observer" class="observer"></div>
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
        this.totalPages = Math.ceil(
          response.headers["x-total-count"] / this.limit
        );
      } catch (e) {
        console.log(e);
      } finally {
        this.isLoading = false;
      }
    },
    async fetchMorePosts() {
      try {
        this.currentPage++;
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts/",
          {
            params: {
              _page: this.currentPage,
              _limit: this.limit,
            },
          }
        );
        this.posts = [...this.posts, ...response.data];
      } catch (e) {
        console.log(e);
      }
    },
  },
  mounted() {
    this.fetchPosts();
    const options = {
      rootMargin: "100px",
      threshold: 1.0,
    };
    const callback = (entries, observer) => {
      if (entries[0].isIntersecting && this.currentPage < this.totalPages) {
        this.fetchMorePosts();
      }
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observer);
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
.blog-header {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
}
</style>
