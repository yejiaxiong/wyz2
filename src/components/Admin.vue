<template>
  <el-container>
    <!-- 头部 -->
    <el-header>学生成绩管理系统
      <span id='tName'>管理员，欢迎您！</span>
      <el-tooltip class="item" effect="dark" content="退出" placement="right" :enterable="false">
        <el-button type="info" icon="el-icon-close" circle size="mini" @click='logout'></el-button>
      </el-tooltip>
      <span id='Time'>登录时间 : {{y}}-{{m}}-{{day}} {{h>10?h:'0'+h}}:{{minute>=10?minute:'0'+minute}}</span>
    </el-header>
    <el-container>
      <!-- 侧边导航 -->
      <el-aside width="200px" style='background-color:#eeeeee'>
        <el-menu text-color="#000" router background-color="#eeeeee"  :default-active="activepath"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse-transition="false"
        unique-opened>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span>学生管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/addstudent" route="/addstudent" @click="saveactivepath('/addstudent')">增加学生</el-menu-item>
              <el-menu-item index="/adminstudent" route="/adminstudent" @click="saveactivepath('/adminstudent')">管理学生</el-menu-item>  
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>老师管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/addteacher" route="/addteacher" @click="saveactivepath('/addteacher')">增加老师</el-menu-item>
              <el-menu-item index="/adminteacher" route="/adminteacher" @click="saveactivepath('/adminteacher')">管理老师</el-menu-item>
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
  data(){
    let date,day,m,y,h,minute,second;

    date = new Date();
    day = date.getDate();
    m = date.getMonth() + 1;
    y = date.getFullYear();
    h = date.getHours();
    minute = date.getMinutes();
    second=date.getSeconds(); 
    return{
      day:day,
      y:y,
      m:m,
      h:h,
      minute:minute,
      second:second,
      activepath:''
    }
  },
  methods: {
    // 退出登陆
    logout(){
      this.$confirm('您确认要退出登陆吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$router.push({ name: 'Login' })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      }); 
    },
    // 侧边导航栏展开
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    // 侧边导航栏关闭
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    saveactivepath(path){
      window.sessionStorage.setItem('activepath',path);
    }
  },
  created(){
    this.activepath = window.sessionStorage.getItem('activepath')
  },
  updated(){
    this.activepath = window.sessionStorage.getItem('activepath');
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
#Time{
  margin-left: 800px;
  font-size: 16px;
  position: absolute;
}
</style>
