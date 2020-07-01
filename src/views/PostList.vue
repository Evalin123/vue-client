<template>
  <div class="table_container">
    <el-form>
      <el-form-item label="文章內容" prop="content">
        <el-input type="text" v-model="content" placeholder="文章內容"></el-input>
      </el-form-item>
      <el-row>
        <el-button type="primary" size="small" @click="search()">查詢</el-button>
        <el-button type="primary" size="small" @click="reset()">重置</el-button>
      </el-row>
    </el-form>
    <div>
      <el-table :data="tableData">
        <el-table-column type="index" label="序號"></el-table-column>
        <el-table-column prop="_id" label="id"></el-table-column>
        <el-table-column prop="title" label="標題"></el-table-column>
        <el-table-column prop="operation">
          <template slot-scope="scope">
            <el-button type="warning" icon="edit" @click="editPost(scope.row)">編輯</el-button>
            <el-button type="danger" icon="delete" @click="deletePost(scope.row)">刪除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <span class="demonstration">完整功能</span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="paginations.pageIndex"
          :page-sizes="paginations.pageSizes"
          :page-size="paginations.pageSize"
          :layout="paginations.layout"
          :total="paginations.total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "postList",
  components: {},
  data() {
    return {
      postList: [],
      tableData: [],
      tmpData: [],
      content: "",
      paginations: {
        pageIndex: 1,
        total: 0,
        pageSize: 5,
        pageSizes: [5, 10, 15, 20],
        layout: "total, sizes, prev, pager, next, jumper"
      }
    };
  },
  created: function() {
    this.getPost();
  },
  methods: {
    editPost(row) {
      const id = row._id;
      this.$router.push("/editpost/" + id);
    },
    deletePost(row) {
      const id = row._id;
      this.$confirm("确认刪除？")
        .then(cfm => {
          console.log(cfm);
          this.$axios.delete("/api/posts/delete/" + id).then(response => {
            console.log(response);
            this.$message({ message: response.data.message, type: "success" });
            this.getPost();
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    getPost() {
      console.log("created");
      this.$axios.get("/api/posts").then(response => {
        console.log(response);
        this.postList = response.data;
        this.tmpData = response.data;
        this.setPagination();
      });
    },
    setPagination() {
      this.paginations.total = this.tmpData.length;
      this.paginations.pageIndex = 1;
      this.paginations.pageSize = 5;
      this.tableData = this.tmpData.filter((item, index) => {
        return index < this.paginations.pageSize;
      });
    },
    handleSizeChange(size) {
      this.paginations.pageIndex = 1;
      this.paginations.pageSize = size;
      this.tableData = this.tmpData.filter((item, index) => {
        return index < this.paginations.pageSize;
      });
    },
    handleCurrentChange(page) {
      let start = this.paginations.pageSize * (page - 1);
      this.tableData = this.tmpData.filter((item, index) => {
        return index >= start && index < this.paginations.pageSize + start;
      });
      // this.tableData = table.filter((item, index) => {
      //   return index < this.paginations.pageSize;
      // }) ;
    },
    search() {
      let content = this.content;
      let searchTable = this.postList.filter((item, index) => {
        return item.content.indexOf(content) > -1;
      });
      this.tmpData = searchTable;
      this.setPagination();
    },
    reset() {
      this.tmpData = this.postList;
      this.setPagination();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
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
