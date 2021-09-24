<template>
  <div class="navbar">
    <router-link class="nav-link" to="/"> Главная </router-link>
    <router-link class="nav-link" to="/blog"> Блог </router-link>
    <router-link class="nav-link" to="/about"> О сайте</router-link>
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
  justify-content: end;
  height: 30px;
  align-items: center;
  border-bottom: 2px solid violet;
}
a.nav-link {
  text-decoration: none;
  margin-right: 10px;
  color: blueviolet;
}
</style>
