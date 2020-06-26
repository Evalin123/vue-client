<template>
  <div id="app">
    <el-button type="primary" class="logout_btn" @click="logout()">Logout</el-button>
    <router-view/>
  </div>
</template>

<script>
import Test from '@/components/Test.vue'
import MyInput from '@/components/MyInput.vue'

export default {
  name : 'app',
  data() {
    return {
      test : 'abc',
      test2 : 'def',
    }
  },
  methods : {
    logout() {
      localStorage.removeItem("jwtToken");
      location.reload();
    }
  },
  components: {
    Test,
    MyInput
  } 
}
</script>

<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
}
</style>
