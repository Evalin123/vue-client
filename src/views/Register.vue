<template>
  <div class="register">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">註冊頁</span>
        <el-form
          :model="registerUser"
          status-icon
          :rules="rules"
          ref="registerForm"
          label-width="100px"
          class="registerForm"
        >
          <el-form-item label="名稱" prop="name">
            <el-input type="text" v-model="registerUser.name" placeholder="名稱"></el-input>
          </el-form-item>
          <el-form-item label="E-mail" prop="email">
            <el-input type="text" v-model="registerUser.email" placeholder="E-mail"></el-input>
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input type="password" v-model="registerUser.password" placeholder="Password"></el-input>
          </el-form-item>
          <el-form-item label="Check Password" prop="password2">
            <el-input type="password" v-model="registerUser.password2" placeholder="Check Password"></el-input>
          </el-form-item>
          <el-form-item label="Description" prop="description">
            <el-input type="text" v-model="registerUser.description" placeholder="Description"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="submit_btn" @click="submitForm('registerForm')">Submit</el-button>
          </el-form-item>
        </el-form>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "register",
  components: {},
  data() {
    const checkPassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密碼需大於6碼"));
      } else {
        callback();
      }
    };
    const checkPassword2 = (rule, value, callback) => {
      if (value != this.registerUser.password) {
        callback(new Error("密碼不一致"));
      } else {
        callback();
      }
    };
    return {
      registerUser: {
        name: "",
        email: "",
        password: "",
        password2: "",
        description: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "不能為空",
            trigger: "blur"
          },
          { min: 2, max: 8, message: "字數錯誤", trigger: "blur" }
        ],
        email: [
          {
            required: true,
            message: "不能為空",
            trigger: "blur",
          },
          {
            type : "email",
            message : "Email格式錯誤",
            trigger : "blur",
          }
        ],
        password: [
          {
            required: true,
            message: "不能為空",
            trigger: "blur"
          },
          {
            validator: checkPassword,
            trigger: "blur"
          }
        ],
        password2: [
          {
            required: true,
            message: "不能為空",
            trigger: "blur"
          },
          {
            validator: checkPassword2,
            trigger: "blur"
          }
        ],
        description: []
      }
    };
  },
  methods: {
    submitForm(formName) {
      console.log(formName);
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post("/api/users/register", this.registerUser)
            .then(response => {
              console.log(response);
              if (response.data.status == "error") {
                this.$message({ message: response.data.msg, type: "error" });
              } else {
                this.$message({ message: "註冊成功", type: "success" });
                this.$router.push('/login');
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
.register {
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

.registerForm {
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
