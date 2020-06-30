<template>
  <div id="app">
    <!-- <el-button type="primary" class="logout_btn" @click="logout()">Logout</el-button> -->
    <HeadNav />
    <el-row>
        <LeftMenu />
<div class="content">
        <router-view />
      </div>
    </el-row>
  </div>
</template>

<script>
import Test from "@/components/Test.vue";
import MyInput from "@/components/MyInput.vue";
import HeadNav from "@/components/HeadNav.vue";
import jwt_decode from "jwt-decode";
import LeftMenu from "@/components/LeftMenu.vue";

export default {
  name: "app",
  data() {
    return {
      test: "abc",
      test2: "def"
    };
  },
  created: function() {
    if (localStorage.jwtToken) {
      const decoded = jwt_decode(localStorage.jwtToken);
      this.$store.dispatch("setIsAutnenticated", !this.isEmpty(decoded));
      this.$store.dispatch("setUser", decoded);
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("jwtToken");
      location.reload();
    },
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  },
  components: {
    Test,
    MyInput,
    HeadNav,
    LeftMenu
  }
};
</script>

<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
}
.content {
  position: relative;
  left:180px;
}
</style>
