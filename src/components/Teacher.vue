<template>
  <!-- 老师主页 -->
  <el-container>
    <!-- 头部 -->
    <el-header>学生成绩管理
    <span id='tName'>{{teacherName}}，欢迎您！</span>
     <el-tooltip class="item" effect="dark" content="退出" placement="right" :enterable="false">
      <el-button type="info" icon="el-icon-close" circle size="mini" @click='logout'></el-button>
    </el-tooltip>
    <span id='Time'>登录时间 : {{y}}-{{m}}-{{day}} {{h>10?h:'0'+h}}:{{minute>=10?minute:'0'+minute}}</span>
    </el-header>
    <el-container>
      <!-- 侧边导航 -->
      <el-aside width="200px" style='background-color:#eeeeee'>
        <el-menu text-color="#000" router background-color="#eeeeee" :default-active="activepath">
          <el-menu-item index="/luru" route="/luru" @click="saveActivePath('/luru')">
            <i class="el-icon-user"></i>
            <span slot="title">录入成绩</span>
          </el-menu-item>
          <el-menu-item index="/changepwd" route="/changepwd" @click="saveActivePath('/changepwd')">
            <i class="el-icon-menu"></i>
            <span slot="title">修改密码</span>
          </el-menu-item>
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
  data () {
    let date,day,m,y,h,minute,second;

    date = new Date();
    day = date.getDate();
    m = date.getMonth() + 1;
    y = date.getFullYear();
    h = date.getHours();
    minute = date.getMinutes();
    second=date.getSeconds(); 
    return {
      teacherName:'',
      activepath:'/luru',
      day:day,
      y:y,
      m:m,
      h:h,
      minute:minute,
      second:second  
    }
  },
  // 默认是luru页
  // 保存activepath和当前用户id到sessionStorage中
  created () {
    if(window.sessionStorage.getItem('activepath') !== null){
      this.activepath = window.sessionStorage.getItem('activepath');
    }
    this.teacherName = window.sessionStorage.getItem('name');
  },
  updated(){
    this.saveActivePath(window.sessionStorage.getItem('activepath'));
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
    // 保存activepath
    saveActivePath(path){
      window.sessionStorage.setItem('activepath',path);
      this.activepath = path;
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
#tName{
  color:#fff;
  display: inline-block;
  margin-left: 60px;
  margin-right: 40px;
  font-size: 16px;
}

</style>
