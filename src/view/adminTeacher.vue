  <template>
  <div>
    <el-breadcrumb separator-class='el-icon-arrow-right'>
      <el-breadcrumb-item :to="{ path: '/admin' }">我的桌面</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/adminteacher' }"
        >管理老师</el-breadcrumb-item
      >
    </el-breadcrumb>
    <el-button  style='background:#009688; color:#fff' @click="serachLike">模糊查询</el-button>
    <el-table
      :data='tableData'
      style='width: 100%'
      :default-sort="{ prop: 'date', order: 'descending' }"
    >
     
      <el-table-column prop='id' label='ID' width='180' sortable> </el-table-column>
      <el-table-column prop='teacherName' label='姓名' width='180'> </el-table-column>

      <el-table-column prop='userName' label='用户名' width='180'>
      </el-table-column>
      <el-table-column prop='password' label='密码' width='180'> </el-table-column>
      <el-table-column align='center'>
        <template slot-scope='scope'>
          <el-button
            type='danger'
            @click.native.prevent='deleteRow(scope.$index, tableData)'
            >删除</el-button
          >
          <el-button type='warning' @click='modTea(scope.row)'>修改</el-button>
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
  data() {
    return {
      tableData: [
        
      ]
  
    };
  },
  methods: {
    deleteRow(index, rows) {
      this.$confirm('此操作将永久删除该老师信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$http({method: "POST",
          url: 'http://192.168.2.15:8081/test/deleteTeacher',
          headers: {'Content-type': 'application/json;charset=UTF-8'},
          data: JSON.stringify(this.tableData[index].id)
        });
        this.getTeachers();
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    modTea(rows) {
      // console.log(rows);
      this.$router.push({ name: 'modTeacher', params: { rows:rows } });
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
    async getTeachers(){
      setTimeout(async ()=>{
        let data;
      
        data = await this.$http.get('getTeachersToAdmin');
        if (data.status!==200) {
          return this.$message.error('获取学生信息失败！')
        }
        this.tableData = data.data
        console.log(this.tableData);
      },100);
    }
  },
  created () {
    //渲染数据
    this.getTeachers();
  }
};
</script>
<style scope>
</style>
