<template>
    <div class="registerContainer">
        <form @submit.prevent="submitRegisterForm">
            <label for="registerUsername">Username</label>
            <input v-model="newUserData.reqUserName" id="registerUsername">

            <label for="registerPassword">Password</label>
            <input v-model="newUserData.reqUserPassword" type="password" id="registerPassword">

            <label for="registerEmail">Email</label>
            <input v-model="newUserData.reqUserEmail" id="registerEmail">

            <input type="submit" value="Register">
        </form>
        <div v-if="errorMessage" class="custom-error-message">
      {{ errorMessage }}
    </div>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    data() {
    return {
      newUserData: {
        reqUserName: "",
        reqUserPassword: "",
        reqUserEmail: "",
      },
      errorMessage: null,
    };
  },
    methods: {
        async submitRegisterForm() {
      try {
        if (this.validateForm()) {
          let response = await axios.post("http://localhost:8081/register", this.newUserData);
          if (response.status === 200) {
            this.$router.push('/login');
          }
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          this.errorMessage = "Username already exists. Please choose a different username.";
        } else {
          console.error("Error during registration:", error);
          this.errorMessage = "An error occurred during registration. Please try again later.";
        }
      }
    },
  

      validateForm() {
            //regex patterns
            const usernameRegex = /^[a-zA-Z0-9_]{6,}$/; // Minimum 6 characters
            const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!]{6,}$/; // At least 1 uppercase, 1 number, minimum 6 characters
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!usernameRegex.test(this.newUserData.reqUserName)) {
                alert("Invalid username (minimum 6 characters)");
                return false;
            }

            if (!passwordRegex.test(this.newUserData.reqUserPassword)) {
                alert("Invalid password (at least 1 uppercase, 1 number, minimum 6 characters)");
                return false;
            }

            if (!emailRegex.test(this.newUserData.reqUserEmail)) {
                alert("Invalid email");
                return false;
            }

            return true;
        },
    },
};
</script>
  
<style lang="scss" scoped>
.registerContainer {
  width: 30%;
  margin: 0 auto; /* Center the content horizontally */
  display: flex;
  flex-direction: column;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 20px; /* Add more space between form and error message */

    label {
      margin-bottom: 5px;
      font-weight: bold;
    }

    input {
      padding: 10px;
      margin-bottom: 15px;
      border: 2px solid #242424;
      border-radius: 20px;
      font-size: 16px;
    }

    input[type="submit"] {
      background-color: #4CAF50;
      color: white;
      cursor: pointer;
    }

    input[type="submit"]:hover {
      background-color: #45a049;
    }
  }

  /* Custom error message styling */
  .custom-error-message {
    margin-top: 10px;
    padding: 10px;
    border: 1px solid #ff0000;
    background-color: #ffebeb;
    color: #ff0000;
    border-radius: 5px;
  }
}

</style>
  