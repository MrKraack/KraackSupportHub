<template>
    <div class="upperBar">
        <router-link to="/register"><img src="" alt="register"></router-link>
        <router-link to="/login"><img src="" alt="login"></router-link>
        <a @click="logoutFunction">Logout</a>
        

    </div>
</template>

<script>
    export default {
      data(){
        return{

        }
      },
      methods: {
        logoutFunction() {
      // Clear user-related information from localStorage


      // Optionally, perform additional logout-related tasks

      // Redirect the user to the login page or another desired page
      this.$router.push('/login');  // Adjust the route as needed
    }
  }
        
    }
</script>

<style lang="scss" scoped>
.upperBar{
    display: flex;
  background-color: #121212;
  height: 5vh;
  justify-content:end;
  a{
    margin: 0px 25px  ;
  }
}

</style>