<template>
  <div class="showInfo">
    <el-row>
      <span class="title">使用者資訊</span>
      <span class="infoarea">
        <div class="userinfo">
          <div class="user-item">
            <i class="fa fa-user"></i>
            <label for>ID:</label>
            <span>{{showInfoUser.id}}</span>
          </div>
          <div class="user-item">
            <i class="fa fa-user"></i>
            <label for>Name:</label>
            <span>{{showInfoUser.name}}</span>
          </div>
          <div class="user-item">
            <i class="fa fa-user"></i>
            <span>Email : {{showInfoUser.email}}</span>
          </div>
          <div class="user-item">
            <i class="fa fa-user"></i>
            <span>Description : {{showInfoUser.description}}</span>
          </div>
        </div>
      </span>

      <!-- <span>
        <div>ID : {{showInfoUser.id}}</div>
        <div>Name : {{showInfoUser.name}}</div>
        <div>Email : {{showInfoUser.email}}</div>
        <div>Description : {{showInfoUser.description}}</div>
      </span>-->
    </el-row>
  </div>
</template>

<script>
export default {
  name: "showInfo",
  components: {},
  data() {
    return {
      showInfoUser: {
        id: "",
        name: "",
        email: "",
        description: ""
      }
    };
  },
  created: function() {
    console.log("created");
    this.$axios.get("/api/users/current", this.loginUser).then(response => {
      console.log(response);
      this.showInfoUser = response.data;
      this.showInfoUser.id = response.data._id;
    });
  },
  methods: {}
};
</script>

<style scoped>
.showInfo {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  text-align: center;
}
.userinfo {
  height: 100%;
  background-color: #eee;
}
.user-item {
  position: relative;
  top: 30%;
  padding: 26px;
  font-size: 28px;
  color: #333;
}
.infoarea {
  text-align: left;
}
</style>
