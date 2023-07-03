<template>
  <nav>
    <router-link :to="{ name: 'home' }">
      <span>Inicio</span>
    </router-link>
  </nav>
</template>

<script>
export default {

}
</script>

<style scoped>
nav {
  padding: 1rem;
  background-color: #000;
  top: 0;
  position: fixed;
  width: 100%;
  z-index: 1;
}

nav a {
  background-color: #000000;
  color: #000;
  padding: 1rem;
  margin: 1px;
  text-decoration: none;
  transition: 1s;
}

nav a span{
  color: #fff;
}

nav a:hover{
  background-color: rgb(64, 56, 112);
  transition: 1s;
}

nav a:hover span{
  background-color: rgb(64, 56, 112);
  color: #fff;
}

div .router-link-exact-active {
  color: #42b983;
}
</style>