<template>
  <div id="app">
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
