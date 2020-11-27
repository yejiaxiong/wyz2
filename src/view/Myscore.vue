<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>我的桌面</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/myscore' }">成绩查看</el-breadcrumb-item>
    </el-breadcrumb>
    <div id="ms">
      <h2>成绩查看</h2>
      <div>姓名：{{stu.studentName}}</div>
      <div>班级：{{stu.studentClass}}</div>
      <div>学号：{{stu.studentNumber}}</div>
      <div>语文：{{stu.chineseScore===null?'暂无成绩':stu.chineseScore+'分'}}</div>
      <div>数学：{{stu.mathScore===null?'暂无成绩':stu.mathScore+'分'}}</div>
      <div>英语：{{stu.englishScore===null?'暂无成绩':stu.englishScore+'分'}}</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      stu: {
        studentNumber: '',
        studentName: '',
        studentClass: '',
        chineseScore:'',
        mathScore:'',
        englishScore:''
      }
    };
  },
  created(){
    this.getMessage();
  },
  methods: {
    async getMessage(){
      let result;

      result = await this.$http.get('getStudentById?id='+window.sessionStorage.getItem('stuid'));
      if(result.status === 200){
        this.stu = result.data;
        console.log(this.stu);
      }else{
        return this.$message.error('获取信息失败！')
      }
    }
  }
};
</script>
<style scope>
#ms {
    position: absolute;
    /*background: rgba(0, 150, 136,.7);*/
    background-image: linear-gradient(#54E38E, #41C7AF);
    left:48%;
    top:50%;
    transform: translate(-50%,-50%);
    width: 600px;
    height: 420px;
    padding: 20px 40px;
    box-sizing: border-box;
    color: #333;
    border-radius: 6%;
}
#ms div{
    background:rgba(255, 255, 255, .5);
    line-height: 45px;
    height: 45px;
    margin: 10px 0;
    padding:0 20px;
    font-size: 20px;
}
h2{
  text-align: center;
}
</style>
