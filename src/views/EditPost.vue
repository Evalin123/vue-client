<template>
  <div class="editPost">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">編輯網誌</span>
        <el-form
          :model="editPost"
          status-icon
          :rules="rules"
          ref="editPostForm"
          label-width="100px"
          class="editPostForm"
        >
          <el-form-item label="標題" prop="title">
            <el-input type="text" v-model="editPost.title" placeholder="標題"></el-input>
          </el-form-item>
          <el-form-item label="內容" prop="content">
            <el-input type="textarea" v-model="editPost.content" placeholder="內容"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="submit_btn" @click="submitForm('editPostForm')">Submit</el-button>
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
      editPost: {
        title: "",
        content: "",
      },
      rules: {
        title: [
          {
            required: true,
            message: "不能為空",
            trigger: "blur"
          },
        ],
        content: [],
      }
    };
  },
  created : function() {
    const postId = this.$route.params.id
    console.log("created");
    this.$axios
      .get("/api/posts/" + postId + '/' , this.addPost)
      .then(response => {
        console.log(response);
        this.editPost = response.data;
        this.editPost.id = response.data._id;
      });
  },
  methods: {
    submitForm(formName) {
      console.log(formName);
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post('/api/posts/edit/' + this.editPost.id + '/', this.editPost)
            .then(response => {
              console.log(response);
              if (response.data.status == "error") {
                this.$message({ message: response.data.message, type: "error" });
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
.editPost {
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

.editPostForm {
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
