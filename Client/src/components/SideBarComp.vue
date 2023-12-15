<template>
  <div class="navBar">
    <nav>
      <router-link to="/dashboard">Dashboard</router-link>
      <router-link to="/Tickets">Tickets</router-link>
      <router-link v-if="userRole===1432" to="/business">Business</router-link>
      <router-link to="/Settings">Settings</router-link>
      <router-link to="/Help">Help</router-link>
    </nav>
  </div>
  <div class="userIcon">

  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      userRole: null,

    }
  },
  methods: {
    async verifyUser() {
      try {
        const response = await axios.get("http://localhost:8081/cookieInfo");
        console.log("sideBar Response: ")
        console.log(response.data)
        this.userRole = response.data.roles

      }
        
      catch(error) {
        console.error("Axios error:", error);

      }
    }

  },
  created() {
    this.verifyUser();

  }

}
</script>

<style lang="scss" scoped>
.navBar {
  display: flex;
  width: 10%;
  background-color: #363636;
  flex-direction: column;
  height: 95vh;
  position: fixed;

  nav {
    display: flex;
    justify-content: center;
    flex-direction: column;

    img {
      background: red;
      width: 100px;
      height: 100px;
    }

    // Use 'a' for styling
    a {
      text-decoration: none;
      padding: 1rem;
      text-decoration: none;
      font-weight: normal;
      color: #898888;
      font-size: 20px;
      font-style: normal;
      line-height: normal;

      // Use 'router-link-active' for active link styling
      &.router-link-active {
        color: #ff5733;
      }
    }
  }
}
</style>