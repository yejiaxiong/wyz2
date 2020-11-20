<template>
  <div>
    <!-- 管理学生 -->
    <el-breadcrumb separator-class='el-icon-arrow-right'>
      <el-breadcrumb-item :to="{ path: '/admin' }">我的桌面</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/adminstudent' }"
        >管理学生</el-breadcrumb-item
      >
      
    </el-breadcrumb>
    <el-row :gutter="20">
      <el-col :span="3" >
        <el-input @keyup.enter.native="search" v-model="searchContent" size="small" placeholder="enter或按钮搜索"></el-input>
      </el-col>
      <el-col :span="4" >
        <el-button type="success" size="small" @click="search">搜索</el-button>
      </el-col>
    </el-row>
    
    <el-table
      size='mini'
      :data='tableData'
      style='width: 100%'
      :default-sort="{ prop: 'date', order: 'descending' }"
    >
      <el-table-column prop='id' label='ID' sortable width='180'>
      </el-table-column>
      <el-table-column prop='studentNumber' label='学号' sortable width='180'>
      </el-table-column>
      <el-table-column prop='studentName' label='姓名' width='180'> </el-table-column>
      <el-table-column prop='studentClass' label='班级' width='180'>
      </el-table-column>
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
          <el-button type='warning' @click='modStu(scope.row)'>修改</el-button>
        </template>
      </el-table-column>
    </el-table><br>
<el-row >
        <el-col :span='13' :offset='8'>
<el-pagination
  @current-change="handleCurrentChange"
  :current-page.sync="currentPage"
  :page-count="pageCount"
  background
  layout="prev, pager, next"
  :total="pageCount"
  >
</el-pagination>
        </el-col></el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      totalData: [],
      tableData: [],
      currentPage:1,
      pageCount: 0,
      searchContent: "",
      stashList: [],
      watchSearch: "" 
    };
  },
  methods: {
    // 分页当前页变化
    handleCurrentChange() {
      let start,end;

      start = (this.currentPage-1)*10;
      end = start+10 > this.totalData.length ? this.totalData.length:start + 10;
      this.tableData = this.totalData.slice(start,end);
    },
    // 删除行
    deleteRow(index, rows) {
      this.$confirm('此操作将永久删除该学生信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$http({method: "POST",
          url: 'http://192.168.2.15:8081/test/deleteStudent',
          headers: {'Content-type': 'application/json;charset=UTF-8'},
          data: JSON.stringify(this.tableData[index].id)
        });
        this.getStudents();
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
    // 修改学生信息 获取当前行存于路由 并跳转到modStudent
    modStu(rows) {
      let rowsstring = JSON.stringify(rows);

      window.sessionStorage.setItem('rows',rowsstring)
      this.$router.push({ name: 'modStudent', params: { rows:rows } });
    },
    // 模糊查询
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
    // 获取学生 并保存到totalData和tableData中
    async getStudents(){
      setTimeout(async ()=>{
        let result;
        
        result = await this.$http.get('getStudentsToAdmin');
        if (result.status!==200) {
          return this.$message.error('获取学生信息失败！')
        }
        this.totalData = result.data
        // this.tableData = this.totalData.slice(0,10);
        let start,end;

        start = (this.currentPage-1)*10;
        end = start+10 > this.totalData.length ? this.totalData.length:start + 10;
        this.tableData = this.totalData.slice(start,end);
        this.pageCount = this.totalData.length
      },100);
    },
    // 当模糊查询框有内容时查找
    search(){
      if(this.searchContent){
        this.totalData = this.totalData.filter(item => {
          return item.studentName.includes(this.searchContent)
        })
        let start,end;

        start = 0;
        end = start+10>this.totalData.length?this.totalData.length:start+10;
        this.tableData = this.totalData.slice(start,end);
        this.pageCount = this.totalData.length
        this.currentPage=1;
      }else if(this.searchContent===''){
        this.getStudents();
      }else{
        this.totalData = this.stashList
      }
      this.handleCurrentChange()
      
    },
    // 
    getList(){
      //一般这里会有一个axios请求
      this.handleCurrentChange(this.currentPage)
      this.stashList = this.tableData  //暂存数组  当搜索为空时候  数组展示所有数据
    }
  
  },
  created () {
    //渲染数据
    //http://192.168.2.15:8081/test/getStudents
    this.getStudents();
  },
  watch: {
    watchSearch: {
      handler(newValue, oldValue){
        let self = this.totalData

        if(newValue){
        //这里要从暂存的所有数据中过滤 放到展示的数组中
          self.totalData = self.stashList.filter(item => {
            return item.studentName.includes(newValue)
          })
          // this.search();
        }else{
          self.totalData = self.stashList
        }
        self.tableList()
      },
      deep:true
    }
  }
};
</script>
<style scope>
</style>
