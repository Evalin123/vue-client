<template>
  <div class="edit">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">編輯頁</span>
        <el-form
          :model="editUser"
          status-icon
          :rules="rules"
          ref="editForm"
          label-width="100px"
          class="editForm"
        >
          <el-form-item label="名稱" prop="name">
            <el-input type="text" v-model="editUser.name" placeholder="名稱"></el-input>
          </el-form-item>
          <el-form-item label="Description" prop="description">
            <el-input type="text" v-model="editUser.description" placeholder="Description"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="submit_btn" @click="submitForm('editForm')">Submit</el-button>
          </el-form-item>
        </el-form>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name : "edit",
  components : {},
  data() {
    return {
      editUser: {
        name: "",
        description: "",
        id : "",
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
        description: [],
        id: [],
      }
    };
  },
  created : function() {
    console.log("mounted");
    this.$axios
      .get("/api/users/current", this.loginUser)
      .then(response => {
        console.log(response);
        this.editUser.name = response.data.name;
        this.editUser.description = response.data.description;
        this.editUser.id = response.data._id;
      });
  },
  methods: {
    submitForm(formName) {
      console.log(formName);
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post('/api/users/edit/' + this.editUser.id + '/', this.editUser)
            .then(response => {
              console.log(response);
              if (response.data.status == "error") {
                this.$message({ message: response.data.msg, type: "error" });
              } else {
                this.$message({ message: response.data.message, type: "success" });
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
}
</script>

<style scoped>
.editUser {
  position: relative;
  width: 100%;
  height: 100%;
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

.editForm {
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
