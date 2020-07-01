<template>
  <el-row class="menu_page">
    <el-col>
      <el-menu
        mode="vertical"
        background-color="#324057"
        text-color="#fff"
        active-text-color="#409eff"
        class="el-menu-vertical-demo"
      >
        <router-link to="/">
          <el-menu-item index="0">
            <i class="fa fa-margin fa-server"></i>
            <span slot="title">首页</span>
          </el-menu-item>
        </router-link>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>使用者</span>
          </template>
          <router-link to="/register">
            <el-menu-item index="1-1">
              <i class="fa fa-margin fa-user"></i>
              <span slot="title">註冊</span>
            </el-menu-item>
          </router-link>
          <router-link to="/edit">
            <el-menu-item index="1-2">
              <i class="fa fa-margin fa-pencil"></i>
              <span slot="title">編輯</span>
            </el-menu-item>
          </router-link>
          <router-link to="/login">
            <el-menu-item index="1-3">
              <i class="fa fa-margin fa-sign-in"></i>
              <span slot="title">登入</span>
            </el-menu-item>
          </router-link>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>文章</span>
          </template>
          <router-link to="/addpost">
            <el-menu-item index="2-1">
              <i class="fa fa-margin fa-user"></i>
              <span slot="title">新增</span>
            </el-menu-item>
          </router-link>
          <router-link to="/postlist">
            <el-menu-item index="2-2">
              <i class="fa fa-margin fa-user"></i>
              <span slot="title">文章列表</span>
            </el-menu-item>
          </router-link>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<style scoped>
.menu_page {
  position: fixed;
  top: 60px;
  left: 0;
  min-height: 100%;
  background-color: #324057;
  z-index: 99;
}
.el-menu {
  border: none;
}
.fa-margin {
  margin-right: 5px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  min-height: 400px;
}
.el-menu-vertical-demo {
  width: 35px;
}
.el-submenu .el-menu-item {
  min-width: 180px;
}

.hiddenDropdown,
.hiddenDropname {
  display: none;
}
a {
  text-decoration: none;
}
</style>
