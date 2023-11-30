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
    data() {
        return {
            userInfo: {
                reqUserName: "",
                reqUserPassword: "",

            }

        }
    },
    methods: {
        async loginSubmit() {
            try {
                console.log('Attempting login with user info:', this.userInfo);

                let response = await axios.post("http://localhost:8081/login", this.userInfo);
                console.log('Server Response:', response);
                
                

               
                //     // Redirect to Tickets
                    this.$router.push('/tickets');
                
            } catch (error) {
                console.error('Error during login:', error);
                // Handle login error as needed
            }
        }
    }

}


</script>

<style lang="scss" scoped>
.loginContainer {
    margin-left: 10%;

    form {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
}
</style>