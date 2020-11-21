<template>
<div>
<el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">我的桌面</el-breadcrumb-item>
  <el-breadcrumb-item :to="{ path: '/luru' }">录入成绩</el-breadcrumb-item>
</el-breadcrumb>
<!-- <el-button  style='background:#009688; color:#fff' @click="serachLike">模糊查询</el-button> -->

  <el-row :gutter="20">
    <el-col :span="3" >
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

  <div ref="chartbox" id="chartbox" :style="{width: '600px', height: '600px'}">
    <span @click="closechart">x</span>
    <div id="myChart" :style="{width: '600px', height: '500px'}"></div>
  </div>

  
  

<el-table
    size="mini"
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
  data () {
    return {
      totalData: [],
      tableData: [],
      currentPage:1,
      pageCount: 0,
      searchContent: "",
      stashList: [],
      watchSearch: "" 
    }
  },
  methods: {
    // 导出数据
    outputdata(){
      let str = '<tr><td>ID</td><td>班级</td><td>姓名</td><td>学号</td><td>分数</td></tr>';

      console.log(this.totalData[0]);
      for(let i = 0 ; i < this.totalData.length ; i++ ){
        str+='<tr>';
        for(const key in this.totalData[i]){
          if(key==='password'||key==='userName'){
            continue
          }
          // 增加\t为了不让表格显示科学计数法或者其他格式
          let content = this.totalData[i][key]===null?'':this.totalData[i][key];

          str+=`<td>${ content + '\t'}</td>`;     
        }
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
      // console.log(`当前页: ${val}`);
      console.log("当前页",this.currentPage);
      console.log("总页数",this.pageCount);
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
        // score.value就是录入的成绩
        this.tableData.forEach((data)=>{
          if(data.id === id){
            data.score = score.value;
            // this.$http.post('updateScore',JSON.stringify(data));
            this.$http({method: 'post',
              url: this.$http.defaults.baseURL+'updateScoreFromTeacher',
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
            data.score = score.value;
            // this.$http.post('updateScore',JSON.stringify(data));
            this.$http({method: 'post',
              url: this.$http.defaults.baseURL+'updateScoreFromTeacher',
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
    
      data = await this.$http.get('getStudentsToTeacher');
      if (data.status!==200) {
        return this.$message.error('获取学生信息失败！')
      }
      this.totalData = data.data
      this.tableData = this.totalData.slice(this.currentPage,10);
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

      // 绘制柱状图表
      /*
      myChart.setOption({
        title: { text: '学生成绩范围' },
        xAxis: {
          type: 'category',
          data: ['0~59', '60~69', '70~79', '80~89', '90~100', '暂无成绩']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          name: '成绩',
          data: [bujige, d, c, b, a, wu],
          type: 'bar'
        }]
      });
      */
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
            radius: ['50%', '70%'],
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
  background: #ddd;
  left: 50%;
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
  height: 5%;
  right: 0%;
  line-height: 30px;
  text-align: center;
  font-size: 20px;
  z-index: 999;
  cursor: pointer;
}
</style>
