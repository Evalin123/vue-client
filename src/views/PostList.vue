<template>
  <div class="table_container">
    <el-table :data="postList">
      <el-table-column type="index" label="序號"></el-table-column>
      <el-table-column prop="_id" label="id"></el-table-column>
      <el-table-column prop="title" label="標題"></el-table-column>
      <el-table-column prop="operation">
        <template slot-scope="scope">
          <el-button type="warning" icon="edit" @click="editPost(scope.row)">編輯</el-button>
          <el-button>刪除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name : "postList",
  components : {},
  data() {
    return {
      postList: [],
    };
  },
  created : function() {
    const postId = this.$route.params.id
    console.log("created");
    this.$axios
      .get("/api/posts")
      .then(response => {
        console.log(response);
        this.postList = response.data;
      });
  },
  methods: {
    submitForm(formName) {
      console.log(formName);
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post('/api/posts/create', this.addPost)
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
    editPost(row) {
      const id = row._id;
      this.$router.push("/editpost/" + id);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>
.addPost {
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

.addPostForm {
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
