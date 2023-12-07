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
                await axios.post("http://localhost:8081/login", this.userInfo);

                // Assuming successful login, redirect to Tickets
                
                    
                    this.$router.push('/tickets');
                
            } catch (error) {
                console.error('Error during login:', error);

                if (error.response && error.response.status) {
                    const statusCode = error.response.status;

                    if (statusCode === 400) {
                        // Bad Request, handle accordingly (e.g., invalid input)
                        alert('Invalid input. Please check your credentials.');
                    } else if (statusCode === 401) {
                        // Unauthorized, incorrect credentials
                        alert('Invalid username or password');
                    } else {
                        // Handle other status codes as needed
                        alert('An error occurred during login. Please try again.');
                    }
                } else {
                    // Handle other types of errors
                    alert('An unexpected error occurred during login. Please try again.');
                }
            }
        }
    }

}


</script>

<style lang="scss" scoped>
.loginContainer {

    form {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
}
</style>