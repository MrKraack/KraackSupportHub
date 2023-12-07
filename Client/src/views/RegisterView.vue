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
      };
    },
    methods: {
      async submitRegisterForm() {
        if (this.validateForm()) {
          let response = await axios.post("http://localhost:8081/register", this.newUserData);
          if (response.status === 200) {
            this.$router.push('/login');
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
    margin-left: 10%;
    display: flex;
    justify-content: center;
    form {
      display: flex;
      flex-direction: column;
    }
  }
  </style>
  