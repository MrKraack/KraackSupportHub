<template>
    <div class="registerContainer">
        <form @submit.prevent="submitRegisterForm">
            <label for="registerUsername">Username</label>
            <input v-model="newUserData.reqUserName" id="registerUsername">
            
            <label for="registerPassword">Password</label>
            <input v-model="newUserData.reqUserPassword" id="registerPassword">

            <label for="registerEmail">Email</label>
            <input v-model="newUserData.reqUserEmail" id="registerEmail">

            <input type="submit" value="Register">
            
        </form>

    </div>
</template>

<script>
import axios from 'axios';

    export default {
        data(){
            return{
                newUserData: {
                    reqUserName: "",
                    reqUserPassword: "",
                    reqUserEmail: "",
                }

            }
        },
        methods: {
            async submitRegisterForm(){
                let response = await axios.post("http://localhost:8081/register", this.newUserData)
                if(response.status === 200){

                    this.$router.push('/login');

                }
            }
        }
        
    }
</script>

<style lang="scss" scoped>
.registerContainer{
    margin-left: 10%;
    display: flex;
    justify-content: center;
    form{
        display: flex;
        flex-direction: column;
    }
}

</style>