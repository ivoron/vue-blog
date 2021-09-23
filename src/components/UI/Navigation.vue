<template>
  <div class="navbar">
    <router-link class="nav-link" to="/"> Гланая </router-link>
    <router-link class="nav-link" to="/blog"> Блог </router-link>
    <router-link class="nav-link" to="/about"> О компании</router-link>
  </div>
</template>
<script>
export default {
  name: "navigation",
};
</script>
<style>
.navbar {
  display: flex;
  justify-content: space-around;
}
a.nav-link {
  color: rebeccapurple;
  text-decoration: none;
}
</style>
