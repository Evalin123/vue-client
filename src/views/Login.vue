<template>
  <div class="login">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">登入頁</span>
        <el-form
          :model="loginUser"
          status-icon
          :rules="rules"
          ref="loginForm"
          label-width="100px"
          class="loginForm"
        >
          <el-form-item label="E-mail" prop="email">
            <el-input type="text" v-model="loginUser.email" placeholder="E-mail"></el-input>
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input type="password" v-model="loginUser.password" placeholder="Password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="submit_btn" @click="submitForm('loginForm')">登入</el-button>
          </el-form-item>
          <div class="tiparea">
            <p>沒有帳號,現在<router-link to = "/register">註冊</router-link></p>
          </div>
        </el-form>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import jwt_decode from 'jwt-decode'

export default {
  name: "login",
  components: {},
  data() {
    return {
      loginUser: {
        email: "",
        password: "",
      },
      rules: {
        email: [
          {
            required: true,
            message: "不能為空",
            trigger: "blur",
          }
        ],
        password: [
          {
            required: true,
            message: "不能為空",
            trigger: "blur"
          }
        ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      console.log(formName);
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post("/api/users/login", this.loginUser)
            .then(response => {
              console.log(response);
              if (response.data.status == "error") {
                this.$message({ message: response.data.msg, type: "error" });
              } else {
                this.$message({ message: "登入成功", type: "success" });
                console.log(response.data.token);
                localStorage.setItem("jwtToken", response.data.token);
                const decoded = jwt_decode(response.data.token);
                console.log(decoded);
                this.$store.dispatch("isAuthenticated", !this.isEmpty(decoded));
                this.$store.dispatch("setUser", decoded);
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/registerBackground.jpg) no-repeat center center;
  background-size: 100% 100%;
}

.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 10%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}

.form_container .manage_tip .title {
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}

.loginForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
  width: 100%;
}
</style>
