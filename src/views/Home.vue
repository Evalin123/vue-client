<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <router-link to = "/about">About</router-link>
    <el-button type="primary" class="submit_btn" @click="getUser()">Home</el-button>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  components: {
  },
  methods :{
    getUser() {
      this.$axios
      .get("/api/users/current", this.loginUser)
      .then(response => {
        console.log(response);
      });
    }
  } 
}
</script>
