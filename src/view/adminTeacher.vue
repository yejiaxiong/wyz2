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
      <el-table-column
        type='index'
        label='ID'
        sortable
        width='50'
      >
      </el-table-column>

      <el-table-column prop='nameT' label='姓名' width='180'> </el-table-column>

      <el-table-column prop='userNameT' label='用户名' width='180'>
      </el-table-column>
      <el-table-column prop='passT' label='密码' width='180'> </el-table-column>
      <el-table-column align='center'>
        <template slot-scope='scope'>
          <el-button
            type='danger'
            @click.native.prevent='deleteRow(scope.$index, tableData)'
            >删除</el-button
          >
          <el-button type='warning' @click='modTea'>修改</el-button>
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
        {
          //假数据

          nameT: '钟1',
          userNameT: 'z1',
          passT: 'sadsad'
        },
        {
          nameT: '钟2',

          userNameT: 'z2',
          passT: 'sadsad1'
        },
        {
          nameT: '钟3',

          userNameT: 'z3',
          passT: 'sadsad3'
        },
        {
          nameT: '钟4',

          userNameT: 'z4',
          passT: 'sadsad4'
        }
      ],
      ruleForm: {
        passT: '',
        checkPassT: '',
        userNameT: '',

        nameT: ''
      }
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
        rows.splice(index, 1);
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
    modTea() {
      this.$router.push({ name: 'modTeacher', params: { id: '3' } });
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
};
</script>
<style scope>
</style>
