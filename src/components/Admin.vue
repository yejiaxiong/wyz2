<template>
  <el-container>
    <!-- 头部 -->
    <el-header>管理员</el-header>
    <el-container>
      <!-- 侧边导航 -->
      <el-aside width="200px" style='background-color:#eeeeee'>
        <el-menu text-color="#000" router background-color="#eeeeee"  default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      unique-opened>
           <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-user"></i>
          <span>学生管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1" route="/addstudent" >增加学生</el-menu-item>
          
          <el-menu-item index="1-2" route="/adminstudent">管理学生</el-menu-item>
          
        </el-menu-item-group>
           </el-submenu>
        <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>老师管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-3" route="/addteacher">增加老师</el-menu-item>
          <el-menu-item index="1-4" route="/adminteacher">管理老师</el-menu-item>
        </el-menu-item-group>
        
        </el-submenu>
           
     
      
        </el-menu>
      </el-aside>
      <!-- 主体区域 -->
      <el-main style="background: #eeeeee">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>
<style scope>
.el-header {
  background: #222222;
  color: #fff;
  font-size: 20px;
  line-height: 60px;
}
.el-container, .el-aside{
  height: 100%;
}

.el-table {
  margin-top: 15px;
}
.bg_green{
  background: #009688;
}
li.is-active{
  background: #009688 !important;
  color:#fff !important;
}
.el-main{
    position: relative;
}
</style>
