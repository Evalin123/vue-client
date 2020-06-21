<template>
  <div class="register">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">註冊頁</span>
        <el-form
          :model="registerUser"
          status-icon
          :rules="rules"
          ref="registerUser"
          label-width="100px"
          class="demo-ruleForm"
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
        </el-form>
      </div>
    </section>
    <!-- <h1>Register</h1>
    <label for="name">Name</label>
    <input type="text" id = "name"/><br>
    
    <label for="email">Email</label>
    <input type="text" id = "email"/><br>
    
    <label for="password">Password</label>
    <input type="password" id = "password"/><br>
    
    <label for="description">Description</label>
    <input type="text" id = "description"/>-->
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
      }
      else {
        callback();
      }
    }
    const checkPassword2 = (rule, value, callback) => {
      if (value != this.registerUser.password) {
        callback(new Error("密碼不一致"));
      }
      else {
        callback();
      }
    }
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
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "不能為空",
            trigger: "blur"
          },
          {
            validator : checkPassword,
            trigger : "blur"
          }
        ],
        password2: [
          {
            required: true,
            message: "不能為空",
            trigger: "blur"
          },
          {
            validator : checkPassword2,
            trigger : "blur"
          }
        ],
        description: [],
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
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

<style lang="stylus" scoped></style>
