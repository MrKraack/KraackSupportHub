<template>
  <div class="upperBar">
      <router-link v-if="userRole === 1432" to="/register">Register</router-link>
      <router-link to="/login">Login</router-link>
      <a @click="logoutFunction">Logout</a>
  </div>
</template>

<script>
export default {
  data() {
      return {
          userRole: 1432, // Replace with the actual user role from your data
      };
  },
  methods: {
      logoutFunction() {
          // Delete cookies or perform logout logic
          this.$router.push('/login');  // Adjust the route as needed
      },
  },
};
</script>

<style lang="scss" scoped>
.upperBar {
  display: flex;
  background-color: #121212;
  height: 5vh;
  justify-content: end;
  align-items: center;

  a {
      margin: 0px 25px;
      color: #fff; // White text color
      text-decoration: none;
      font-size: 16px;

      &:hover {
          text-decoration: underline;
      }
  }
}
</style>
