<template>
  <div class="myInput">
    <h1>{{msg}}</h1>
    <input type="text">

  </div>
</template>

<script>
export default {
  name: 'MyInput',
  props: {
    msg: String
  }
}
</script>
