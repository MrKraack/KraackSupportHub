<template>
    <div class="loginContainer">
        <form @submit.prevent="loginSubmit">
            <label for="loginUsername">Username</label>
            <input v-model="userInfo.reqUserName" id="loginUsername">

            <label for="loginPassword">Password</label>
            <input type="password" v-model="userInfo.reqUserPassword" id="loginPassword">

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
    background-color: #242424;
    height: 100vh; /* Set the height to 100% of the viewport height */
    display: flex;
    justify-content: center;
    margin: 5% 0%;

    form {
        width: 30%;
        display: flex;
        flex-direction: column;

        label {
            margin-bottom: 5px;
            font-weight: bold;
            color: white; /* Set label text color to white */
        }

        input {
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
            background-color: #fff; /* Set input background color to white */
            color: #333; /* Set input text color */
        }

        button {
            padding: 10px;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            background-color: #4CAF50;
            color: white;
            cursor: pointer;
        }

        button:hover {
            background-color: #45a049;
        }
    }
}
</style>
