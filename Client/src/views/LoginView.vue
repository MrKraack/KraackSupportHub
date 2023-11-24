<template>
    <div class="loginContainer">
        <form @submit.prevent="loginSubmit">
            <label for="loginUsername">Username</label>
            <input v-model="userInfo.reqUserName" id="loginUsername">
            
            <label for="loginPassword">Password</label>
            <input v-model="userInfo.reqUserPassword" id="loginPassword">

            <button type="submit">Login</button>
            


        </form>


    </div>
</template>

<script>
import axios from 'axios';

    export default {
        data(){
            return{
                userInfo: {
                    reqUserName: "",
                    reqUserPassword: "",

                }

            }
        },
        methods: {
            async loginSubmit(){
                // console.log(this.userInfo)
                console.log("Trigger")
                let response = await axios.post("http://localhost:8081/login", this.userInfo)
                console.log(response)
                //If the login was a success, set token at localstorage and redirect to Tickets
                if (response.status === 200 && response.data.userObject.token){

                    localStorage.setItem("userToken", response.data.userObject.token)
                    this.$router.push('/tickets');
                    localStorage.setItem("userName", response.data.userObject.userName)
                }
 

            }
        }
        
    }
</script>

<style lang="scss" scoped>
.loginContainer{
    margin-left: 10%;
    form{
        display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    }
}

</style>