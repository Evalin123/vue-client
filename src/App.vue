<template>
  <div id="app">
    <div>
      <!-- <h1>MyInput</h1>
      <a href="https://www.w3schools.com">Visit W3Schools.com!</a>

      <MyInput msg="Email"></MyInput>
      <MyInput msg="Password"></MyInput> -->
      <router-view/>
    </div>
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
  components: {
    Test,
    MyInput
  } 
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
