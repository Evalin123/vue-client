<template>
  <header class="head-nav">
    <el-row>
      <el-col :span="6" class="logo-container">
        <router-link to="/">
          <img src="../assets/logo.png" alt class="logo" />
        </router-link>
        <span class="title">ABC</span>
      </el-col>
      <el-col :span="6" class="user">
        <div class="userInfo">
          <div class="welcome" v-if="isLogin">
            <p class="name">歡迎 {{user.name}}</p>
          </div>
          <div class="welcome" v-else>
            <p class="name">尚未登入</p>
          </div>
          <span>
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                下拉菜单
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="Home" v-show="isLogin">Home</el-dropdown-item>
                <el-dropdown-item command="register">Register</el-dropdown-item>
                <el-dropdown-item command="login">Login</el-dropdown-item>
                <el-dropdown-item command="logout" v-show="isLogin">Logout</el-dropdown-item>
                <el-dropdown-item command="edit" v-show="isLogin">Edit</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </div>
      </el-col>
    </el-row>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isLogin : false,
    }
  },
  methods: {
    handleCommand(command) {
      this.$message("click on item " + command);
      switch (command) {
        case "Home":
          this.$router.push("/");
          break;
        case "logout":
          this.logout();
          break;
        default:
          this.$router.push(command);
      }
    },
    logout() {
      localStorage.removeItem("jwtToken");
      location.reload();
    }
  },
  created : function() {
    this.isLogin = this.$store.getters.isAuthenticated;
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  }
};
</script>

<style scoped>
.head-nav {
  width: 100%;
  height: 60px;
  min-width: 600px;
  background: #324057;
  color: #fff;
  border-bottom: 1px solid #1f2d3d;
}
.logo-container {
  line-height: 60px;
  min-width: 400px;
}
.logo {
  height: 40px;
  width: 40px;
  margin-right: 5px;
  vertical-align: middle;
  display: inline-block;
}
.title {
  vertical-align: middle;
}
.user {
  line-height: 60px;
  float: right;
  text-align: right;
}
.name {
  font-size: 12px;
  line-height: 20px;
}
.welcome {
  display: inline-block;
  width: auto;
  margin-top: 5px;
}
.el-dropdown {
  color: #fff;
}
</style>