<template>
<div>
<el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">我的桌面</el-breadcrumb-item>
  <el-breadcrumb-item :to="{ path: '/luru' }">录入成绩</el-breadcrumb-item>
</el-breadcrumb>
<el-button  style='background:#009688; color:#fff' @click="serachLike">模糊查询</el-button>
<el-table
    border
    :data="tableData"
    style="width: 100%"
    :default-sort="{ prop: 'id', order: 'ascending' }"
    >
        <el-table-column prop="id" label="ID" sortable width="180">
        </el-table-column>
        <el-table-column prop="studentNumber" label="学号" sortable width="180">
        </el-table-column>
        <el-table-column prop="studentName" label="名字" width="180">
        </el-table-column>
        <el-table-column prop="studentClass" label="班级" width="180">
        </el-table-column>
        <el-table-column prop="score" label="分数" width="180">
        </el-table-column>
        <!-- 操作列 -->
        <el-table-column align="center">
            <template slot-scope="scope">
                <el-button type="danger" @click="luru(scope.row.id)" :disabled="scope.row.score!==null">录入成绩</el-button>
                <el-button type="warning" @click="modify(scope.row.id)" :disabled="scope.row.score===null">修改成绩</el-button>
            </template>
        </el-table-column>
</el-table><br>
<el-row >
        <el-col :span='13' :offset='8'>
<el-pagination
  background
  layout="prev, pager, next"
  :total="50">
</el-pagination>
        </el-col></el-row>
</div>

</template>
<script>
export default {
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    luru (id) {
      this.$prompt('', '请输入成绩', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^(?:[1-9]?\d|100)$/,
        inputErrorMessage: '分数格式不正确'
      }).then((score) => {
        // score.value就是录入的成绩
        
        this.tableData.forEach((data)=>{
          if(data.id === id){
            data.score = score.value;
            // this.$http.post('updateScore',JSON.stringify(data));
            this.$http({method: "POST",
              url: 'http://192.168.2.15:8081/test/updateScoreFromTeacher',
              headers: {'Content-type': 'application/json;charset=UTF-8'},
              data: JSON.stringify(data)});
          }
        
        })
        this.$message({
          type: 'success',
          message: '录入成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消录入'
        })
      })
    },
    modify (id) {
      this.$prompt('', '请输入修改的成绩', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^(?:[1-9]?\d|100)$/,
        inputErrorMessage: '分数格式不正确'
      }).then((score) => {
        this.tableData.forEach((data)=>{
          if(data.id === id){
            data.score = score.value;
            // this.$http.post('updateScore',JSON.stringify(data));
            this.$http({method: "POST",
              url: 'http://192.168.2.15:8081/test/updateScoreFromTeacher',
              headers: {'Content-type': 'application/json;charset=UTF-8'},
              data: JSON.stringify(data)});
          }
        })
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        this.getStudents();
        console.log(this.tableData);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消修改'
        })
      })
    },
    serachLike () {
      console.log('模糊查询')
      this.$prompt('', '请输入查询的姓名', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      
       
      }).then((score) => {
        
        
        this.$message({
          type: 'success',
          message: '查询成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消查询'
        })
      })
    },
    async getStudents(){
      let data;
      
      data = await this.$http.get('getStudentsToTeacher');
      if (data.status!==200) {
        return this.$message.error('获取学生信息失败！')
      }
      this.tableData = data.data
      console.log(this.tableData);
    }
  },
  created () {
    //渲染数据
    //http://192.168.2.15:8081/test/getStudents
    this.getStudents();
  }
}
</script>
<style scope>
</style>
