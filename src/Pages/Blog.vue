<template>
  <div @click.stop="showModal = false">
    <h2>История постов</h2>
    <my-modal :show="showModal">
      <post-form @showModel="showModal = false" />
    </my-modal>
    <div class="blog-header">
      <my-button @click.stop="showModal = true">Добавить пост</my-button>
      <my-input
        placeholder="Поиск..."
        :model-value="searchQuery"
        @update:model-value="setSearchQuery"
      />
    </div>
    <h3 v-if="isLoading">Получение данных от сервера...</h3>
    <post-list
      v-else
      :posts="sortedSearchedPosts"
      :sortOptions="sortOptions"
      :sortType="sortType"
      @remove="removePost"
      @sortPosts="setSortType"
    />
    <div ref="observer" class="observer"></div>
  </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import axios from "axios";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  components: {
    PostList,
    PostForm,
  },
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    ...mapMutations([
      "setCurrentPage",
      "setSearchQuery",
      "removePost",
      "setSortType",
    ]),
    ...mapActions(["fetchPosts", "fetchMorePosts"]),
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
    ...mapState({
      posts: (state) => state.posts,
      isLoading: (state) => state.isLoading,
      sortType: (state) => state.sortType,
      searchQuery: (state) => state.searchQuery,
      currentPage: (state) => state.currentPage,
      limit: (state) => state.limit,
      totalPages: (state) => state.totalPages,
      sortOptions: (state) => state.sortOptions,
    }),
    ...mapGetters(["sortedPost", "sortedSearchedPosts"]),
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
