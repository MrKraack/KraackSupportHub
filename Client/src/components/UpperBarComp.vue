<template>
    <div class="upperBar">
        <router-link to="/createTicket"><img src="" alt="createTicket"></router-link>
        <router-link to="/register"><img src="" alt="register"></router-link>
        <router-link to="/login"><img src="" alt="login"></router-link>
        

    </div>
</template>

<script>
    export default {
        
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