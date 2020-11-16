<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">我的桌面</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/myscore' }">成绩查看</el-breadcrumb-item>
    </el-breadcrumb>
    <h2>成绩查看</h2>
    <div id="ms">
      <div>姓名：{{stu.name}}</div>
      <div>班级：{{stu.classname}}</div>
      <div>学号：{{stu.stuid}}</div>
      <div>分数：{{stu.score}}分</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      stu: {
        stuid: '3117001940',
        name: '叶嘉雄',
        classname: '170815',
        score: 100
      }
    };
  }
};
</script>
<style scope>
#ms {
    position: absolute;
    background: #1e9fff;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
    width: 300px;
    height: 260px;
    padding: 20px 40px;
    box-sizing: border-box;
}
#ms div{
    background: #fff;
    line-height: 35px;
    height: 35px;
    margin: 15px 0;
}
h2{
  text-align: center;
}
</style>
