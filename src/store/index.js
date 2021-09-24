import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: () => ({
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
  }),
  getters: {
    getPosts(state) {
      return state.posts;
    },
    sortedPosts(state) {
      return [...state.posts].sort((post1, post2) =>
        post1[state.sortType]?.localeCompare(post2[state.sortType])
      );
    },
    sortedSearchedPosts(state, getters) {
      return getters.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    },
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    addNewPost(state, newPost) {
      state.posts.unshift(newPost);
      state.showModal = false;
    },
    removePost(state, post) {
      state.posts = state.posts.filter((p) => p.id !== post.id);
    },
    setLoading(state, bool) {
      state.isLoading = bool;
    },
    setSortType(state, type) {
      state.sortType = type;
    },
    setSearchQuery(state, query) {
      state.searchQuery = query;
    },
    setCurrentPage(state, pageNumber) {
      state.currentPage = pageNumber;
    },
    setTotalPages(state, total) {
      state.totalPages = total;
    },
  },
  actions: {
    async fetchPosts({ state, commit }) {
      try {
        commit("setLoading", true);
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts/",
          {
            params: {
              _page: state.currentPage,
              _limit: state.limit,
            },
          }
        );
        commit("setPosts", response.data);
        commit(
          "setTotalPages",
          Math.ceil(response.headers["x-total-count"] / state.limit)
        );
      } catch (e) {
        console.log(e);
      } finally {
        commit("setLoading", false);
      }
    },
    async fetchMorePosts({ state, commit }) {
      try {
        commit("setCurrentPage", state.currentPage++);
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts/",
          {
            params: {
              _page: state.currentPage,
              _limit: state.limit,
            },
          }
        );
        commit("setPosts", [...state.posts, ...response.data]);
      } catch (e) {
        console.log(e);
      }
    },
  },
  modules: {},
});
