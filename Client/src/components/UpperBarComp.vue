<template>
    <div class="upperBar">
        <router-link to="/createTicket"><img src="" alt="createTicket"></router-link>
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
      localStorage.removeItem("userName");
      localStorage.removeItem("userToken")

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
  margin-left: 10%;
  background-color: #121212;
  height: 5vh;
  justify-content:end;
  a{
    margin: 0px 25px  ;
  }
}

</style>