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
        <el-table-column prop="stuid" label="学号" sortable width="180">
        </el-table-column>
        <el-table-column prop="name" label="名字" width="180">
        </el-table-column>
        <el-table-column prop="classname" label="班级" width="180">
        </el-table-column>
        <el-table-column prop="score" label="分数" width="180">
        </el-table-column>
        <!-- 操作列 -->
        <el-table-column align="center">
            <template slot-scope="scope">
                <el-button type="danger" @click="luru(scope.row.id)" :disabled="scope.row.score!==''">录入成绩</el-button>
                <el-button type="warning" @click="modify(scope.row.id)" :disabled="scope.row.score===''">修改成绩</el-button>
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
      tableData: [{
        id: '1',
        stuid: '3117001940',
        name: '叶嘉雄',
        classname: '170815',
        score: ''
      },
      {
        id: '2',
        stuid: '3117001941',
        name: '李光明',
        classname: '170815',
        score: 100
      },
      {
        id: '2',
        stuid: '3117001941',
        name: '李光明',
        classname: '170815',
        score: 100
      },
      {
        id: '2',
        stuid: '3117001941',
        name: '李光明',
        classname: '170815',
        score: 100
      },
      {
        id: '2',
        stuid: '3117001941',
        name: '李光明',
        classname: '170815',
        score: 100
      },
      {
        id: '2',
        stuid: '3117001941',
        name: '李光明',
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
  methods: {
    luru (id) {
      this.$prompt('', '请输入成绩', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^(?:[1-9]?\d|100)$/,
        inputErrorMessage: '分数格式不正确'
      }).then((score) => {
        // score.value就是录入的成绩
        console.log(score.value);
        this.tableData.forEach((data)=>{
          if(data.id === id){
            data.score = score.value;
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
          }
        })
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
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
    }
  }
}
</script>
<style scope>
</style>
