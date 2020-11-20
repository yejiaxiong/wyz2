<template>
  <div>
    <!-- 管理老师 -->
    <el-breadcrumb separator-class='el-icon-arrow-right'>
      <el-breadcrumb-item :to="{ path: '/admin' }">我的桌面</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/adminteacher' }"
        >管理老师</el-breadcrumb-item
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
    // 删除一行老师信息
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
    // 当前页数发生变化
    handleCurrentChange() {
      let start,end;

      start = (this.currentPage-1)*10;
      end = start+10 > this.totalData.length ? this.totalData.length:start + 10;
      this.tableData = this.totalData.slice(start,end);
    },
    // 修改老师信息 保存改行老师信息至路由中 跳转到modTeacher界面
    modTea(rows) {
      let rowsstring = JSON.stringify(rows);
      
      window.sessionStorage.setItem('rows',rowsstring)
      this.$router.push({ name: 'modTeacher', params: { rows:rows } });
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
    // 获取老师信息 存于totalData和tableData中
    async getTeachers(){
      setTimeout(async ()=>{
        let result;
      
        result = await this.$http.get('getTeachersToAdmin');
        if (result.status!==200) {
          return this.$message.error('获取教师信息失败！')
        }
        this.totalData = result.data
        let start,end;

        start = (this.currentPage-1)*10;
        end = start+10 > this.totalData.length ? this.totalData.length:start + 10;
        this.tableData = this.totalData.slice(start,end);
        this.pageCount = this.totalData.length
      },100);
    },
    // 查询过滤
    search(){
      if(this.searchContent){
        this.totalData = this.totalData.filter(item => {
          return item.teacherName.includes(this.searchContent)
        })
        this.tableData = this.totalData.slice(0,10);
        this.pageCount = this.totalData.length
        this.currentPage=1;
      }else if(this.searchContent===''){
        this.getTeachers();
      }else{
        this.totalData = this.stashList
      }
      this.handleCurrentChange()
    },
    getList(){
      //一般这里会有一个axios请求
      this.handleCurrentChange(this.currentPage)
      this.stashList = this.tableData  //暂存数组  当搜索为空时候  数组展示所有数据
    }
  },
  created () {
    //渲染数据
    this.getTeachers();

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
