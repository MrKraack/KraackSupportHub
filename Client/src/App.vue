<template>
  <UpperBarComp></UpperBarComp>
  <NavBarComp></NavBarComp>
  <router-view/>
</template>
<script>
import NavBarComp from "./components/SideBarComp.vue"
import UpperBarComp from "./components/UpperBarComp.vue"

export default{
  data() {
    return {

    }
  },
  components: {
    NavBarComp,
    UpperBarComp
  }
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
