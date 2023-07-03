<template>
  <body>
    <div v-if="token">
      <Navbar></Navbar>
    </div>
    <div class="container">
      <router-view />
    </div>
  </body>
</template>

<script>
import { defineAsyncComponent, ref, onMounted, onBeforeMount, watch } from "vue";
import { useRouter } from "vue-router";

export default {
  components: {
    Navbar: defineAsyncComponent(() =>import(/*webpackChunkName: "Navbar" */ "@/components/Navbar.vue")),
  },
  setup() {
    const dateTokenExpiration = ref(null);
    const router = useRouter();
    const token = ref(sessionStorage.getItem("Token"));

    onMounted(() => {
      if(token.value == null){
        router.push({ name: "login" });
      }
    });

    return {
      token,
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  margin: 0;
  padding: 0;
  background-color: #0d1c31;
}

.container{
  margin-top: 4rem;
}
</style>
