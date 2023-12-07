<template>
  <UpperBarComp></UpperBarComp>
  <SideBarComp v-if="shouldRenderSideBar"></SideBarComp>
   
  <router-view/>
</template>
<script>
import UpperBarComp from "./components/UpperBarComp.vue"
import SideBarComp from "./components/SideBarComp.vue";

export default{
  data() {
    return {

    }
  },
  components: {
    UpperBarComp,
    SideBarComp
  },
  computed: {
    // Compute a boolean value based on the current route
    shouldRenderSideBar() {
      // Access the current route from the Vue Router
      const currentRoute = this.$route.path;

      // Conditionally render SideBarComp only if the route is not "/login"
      return currentRoute !== "/login";
    },
  },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}
body{
  background-color: #242424;
  margin: 0px;
  

}
</style>
