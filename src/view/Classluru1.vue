<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/teacher' }" >我的桌面</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/classluru1' }">录入成绩</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="20">
      <el-col :span="4" >
        <el-input @keyup.enter.native="search" v-model="searchContent" size="small" placeholder="按名字进行模糊查询"></el-input>
      </el-col>
      <el-col :span="2" style="text-align:center">
        <el-button type="success" size="small" @click="search">查询</el-button>
      </el-col>
      <el-col :span="2" >
        <el-button type="success" size="small" @click="showdata">图表展示</el-button>
      </el-col>
      <el-col :span="2" >
        <el-button type="success" size="small" @click="outputdata">导出到表格</el-button>
      </el-col>
    </el-row>
    <!-- 图表 -->
    <div ref="chartbox" id="chartbox" :style="{width: '400px', height: '400px'}">
      <span @click="closechart">x</span>
      <div id="myChart" :style="{width: '400px', height: '400px'}"></div>
    </div>
    <!-- 表格区域 -->
    <el-table
        size="mini"
        border
        :data="tableData"
        style="width: 90%"
        :default-sort="{ prop: 'id', order: 'ascending' }"
        >
      <el-table-column prop="id" label="ID" sortable width="60">
      </el-table-column>
      <el-table-column prop="studentNumber" label="学号" sortable width="100">
      </el-table-column>
      <el-table-column prop="studentName" label="名字" width="100">
      </el-table-column>
      <el-table-column prop="studentClass" label="班级" width="80">
      </el-table-column>
      <el-table-column prop="score" :label="teacherjob+'分数'" width="110">
      </el-table-column>
      <!-- 操作列 -->
      <el-table-column align="center" label="操作">
          <template slot-scope="scope">
              <el-button type="danger" size="small" @click="luru(scope.row.id)" :disabled="scope.row.score!==null">录入成绩</el-button>
              <el-button type="warning" size="small" @click="modify(scope.row.id)" :disabled="scope.row.score===null">修改成绩</el-button>
          </template>
      </el-table-column>
    </el-table>
    <br>
    <!-- 分页区域 -->
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
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      totalData: [],
      tableData: [],
      currentPage:1,
      pageCount: 0,
      searchContent: "",
      stashList: [],
      watchSearch: "" ,
      teacherjob:''
    }
  },
  methods: {
    // 导出数据到表格
    outputdata(){
      let str = `<tr><td>ID</td><td>班级</td><td>姓名</td><td>学号</td><td>${this.teacherjob}分数</td></tr>`;

      console.log(this.totalData);
      for(let i = 0 ; i < this.totalData.length ; i++ ){
        str+='<tr>';
        str+=`<td>${ this.totalData[i].id + '\t'}</td>
          <td>${ this.totalData[i].studentClass + '\t'}</td>
          <td>${ this.totalData[i].studentName + '\t'}</td>
          <td>${ this.totalData[i].studentNumber + '\t'}</td>
          <td>${ this.totalData[i][this.teacherjob+"Score"]===null?'':this.totalData[i][this.teacherjob+"Score"] + '\t'}</td>
              `;      
        str+='</tr>';
      }
      const worksheet = 'Sheet1'

      const uri = 'data:application/vnd.ms-excel;base64,'

      const template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" 
        xmlns:x="urn:schemas-microsoft-com:office:excel" 
        xmlns="http://www.w3.org/TR/REC-html40">
        <head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
        <x:Name>${worksheet}</x:Name>
        <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>
        </x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
        </head><body><table>${str}</table></body></html>`;
      
      // 下载模板
      const base64 = s => window.btoa(unescape(encodeURIComponent(s)));

      window.location.href = uri + base64(template);
    },
    // 页数变化
    handleCurrentChange() {
      let start,end;

      start = (this.currentPage-1)*10;
      end = start+10 > this.totalData.length ? this.totalData.length:start + 10;
      this.tableData = this.totalData.slice(start,end);
    },
    // 录入学生成绩
    luru (id) {
      this.$prompt('', '请输入成绩', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^(?:[1-9]?\d|100)$/,
        inputErrorMessage: '分数格式不正确'
      }).then((score) => {
        for(let i=0;i<this.totalData.length;i++){
          if(this.totalData[i].id === id){
            let teacherjob = window.sessionStorage.getItem("teacherjob");

            let obj ={};

            obj.id = id;
            obj.chineseScore = this.totalData[i].chineseScore;
            obj.mathScore = this.totalData[i].mathScore;
            obj.englishScore = this.totalData[i].englishScore;
            obj[teacherjob+"Score"] = parseInt(score.value,10).toString();
            this.$http({method: 'post',
              url: this.$http.defaults.baseURL+'updateScoreFromTeacher',
              headers: {'Content-type': 'application/json;charset=UTF-8'},
              data: JSON.stringify(obj)});
          }
        }
        this.$message({
          type: 'success',
          message: '录入成功!'
        })
        setTimeout(()=>{
          this.getStudents();
        },100) 
      }).catch((err) => {
        console.log(err);
        this.$message({
          type: 'info',
          message: '已取消录入'
        })
      })
    },
    // 修改学生成绩
    modify (id) {
      this.$prompt('', '请输入修改的成绩', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^(?:[1-9]?\d|100)$/,
        inputErrorMessage: '分数格式不正确'
      }).then((score) => {
        this.tableData.forEach((data)=>{
          if(data.id === id){
            let teacherjob = window.sessionStorage.getItem("teacherjob");

            let obj ={};

            obj.id = id;
            obj.chineseScore = data.chineseScore;
            obj.mathScore = data.mathScore;
            obj.englishScore = data.englishScore;
            obj[teacherjob+"Score"] = parseInt(score.value,10);
            this.$http({method: 'post',
              url: this.$http.defaults.baseURL+'updateScoreFromTeacher',
              headers: {'Content-type': 'application/json;charset=UTF-8'},
              data: JSON.stringify(obj)});
          }
        })
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        setTimeout(()=>{
          this.getStudents();
        },100) 
        // console.log(this.tableData);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消修改'
        })
      })
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
    // 获取学生信息
    async getStudents(){
      let data;

      this.classNumber = window.sessionStorage.getItem("classNumber");
      console.log("班级",this.classNumber);
      //根据班级号获取该班级号下的学生信息 在sessionStorage中
      data = await this.$http.get('getStudentsToTeacher/'+window.sessionStorage.getItem('classNumber'));
      if (data.status!==200) {
        return this.$message.error('获取学生信息失败！')
      }
      let teacherjob = window.sessionStorage.getItem("teacherjob");

      this.totalData = data.data
      for(let i=0;i<this.totalData.length;i++){
        this.totalData[i].score=this.totalData[i][teacherjob+"Score"];
      }
      this.tableData = this.totalData.slice(this.currentPage-1,10);
      this.pageCount = this.totalData.length
    },
    // 获取学生信息辅助1
    search(){
      if(this.searchContent){
        this.totalData = this.totalData.filter(item => {
          return item.studentName.includes(this.searchContent)
        })
        this.tableData = this.totalData.slice(0,10);
        this.pageCount = this.totalData.length
        this.currentPage=1;
      }else if(this.searchContent===''){
        this.getStudents();
      }else{
        this.totalData = this.stashList
      }
      this.handleCurrentChange()
    },
    // 获取学生信息辅助2
    getList(){
      //一般这里会有一个axios请求
      this.handleCurrentChange(this.currentPage)
      this.stashList = this.tableData  //暂存数组  当搜索为空时候  数组展示所有数据
    },
    // 页码发生改变
    handleSizeChange(val) {
      this.pagesize = val
      this.tableList()
    },
    // 绘制图表
    drawLine(){
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))

      let bujige=0, d=0,c=0,b=0,a=0,wu=0;

      this.totalData.forEach((item)=>{
        let score = parseInt(item.score, 10);

        if(score>=0&&score<=59){
          bujige++;
        }else if(score>=60&&score<=69){
          d++;
        }else if(score>=70&&score<=79){
          c++;
        }else if(score>=80&&score<=89){
          b++;
        }else if(score>=90&&score<=100){
          a++;
        }else{
          wu++;
        }
      })
      myChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 10,
          data: ['0分~59分', '60分~69分', '70分~79分', '80分~89分', '90分~100分', '暂无成绩']
        },
        series: [
          {
            name: '成绩详情',
            type: 'pie',
            radius: ['40%', '55%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              {value: bujige, name: '0分~59分'},
              {value: d, name: '60分~69分'},
              {value: c, name: '70分~79分'},
              {value: b, name: '80分~89分'},
              {value: a, name: '90分~100分'},
              {value: wu, name: '暂无成绩'}
            ]
          }
        ]
      })
    },
    // 展示数据(修改div的display)
    showdata(){
      this.drawLine();
      this.$refs.chartbox.style.display='block'
    },
    // 关闭展示图(修改div的display)
    closechart(){
      this.$refs.chartbox.style.display='none'
    }
  },
  created () {
    this.teacherjob = window.sessionStorage.getItem("teacherjob");
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
        }else{
          self.totalData = self.stashList
        }
        self.tableList()
      },
      deep:true
    }
  }
}
</script>
<style scope>
#chartbox{
  position: absolute;
  left: 40%;
  top: 45%;
  z-index: 998;
  transform: translate(-50%,-50%);
  display: none;
}
#myChart{
  position: absolute;
  top:10%;
  z-index: 999;
}
#chartbox span{
  position: absolute;
  width: 5%;
  right: 0%;
  line-height: 30px;
  text-align: center;
  font-size: 20px;
  z-index: 999;
  cursor: pointer;
}
</style>
