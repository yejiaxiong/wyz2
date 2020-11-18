<template>
  <el-container>
    <!-- 头部 -->
    <el-header>学生成绩管理</el-header>
    <el-container>
      <!-- 侧边导航 -->
      <el-aside width="200px" style='background-color:#eeeeee'>
        <el-menu text-color="#000" router background-color="#eeeeee" :default-active="activepath">
          <el-menu-item index="/luru" route="/luru" @click="saveActivePath('/luru')">
            <i class="el-icon-user"></i>
            <span slot="title">录入成绩</span>
            <i class="el-icon-arrow-right"></i>
          </el-menu-item>
          <el-menu-item index="/changepwd" route="/changepwd" @click="saveActivePath('/changepwd')">
            <i class="el-icon-menu"></i>
            <span slot="title">修改密码</span>
            <i class="el-icon-arrow-right"></i>
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
    return {
      activepath:'/luru',
      tableData: [{
        id: '1',
        stuid: '3117001940',
        name: '叶嘉雄',
        classname: '170815',
        score: 100
      },
      {
        id: '2',
        stuid: '3117001941',
        name: '李光明',
        classname: '170815',
        score: 100
      }
      ]
    }
  },
  created () {
    if(window.sessionStorage.getItem('activepath') !== null){
      this.activepath = window.sessionStorage.getItem('activepath');
    }
    
  },
  methods: {
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

</style>
