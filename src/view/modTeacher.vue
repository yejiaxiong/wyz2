<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin' }">我的桌面</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/adminteacher' }"
        >管理老师</el-breadcrumb-item
      >
    </el-breadcrumb>
    <el-row :gutter="20">
      <el-col :span="11" :offset="9"
        ><div>
          <h1>修改老师信息</h1>
        </div></el-col
      ></el-row
    >
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      size="small"
    >
      <el-row :gutter="20">
        <el-col :span="12" :offset="5"
          ><div>
            <el-form-item label="用户名" prop="userName">
              <el-input v-model="ruleForm.userName" ref="userName" :disabled="isdisabled"></el-input>
            </el-form-item></div></el-col
      ></el-row>
      <el-row :gutter="20">
        <el-col :span="12" :offset="5"
          ><div>
            <el-form-item label="密码" prop="password">
              <el-input
                type="password"
                v-model="ruleForm.password"
                autocomplete="off"
              ></el-input>
            </el-form-item></div></el-col
      ></el-row>
      <el-row :gutter="20">
        <el-col :span="12" :offset="5"
          ><div>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input
                type="password"
                v-model="ruleForm.checkPass"
                autocomplete="off"
              ></el-input>
            </el-form-item></div></el-col
      ></el-row>
      <el-row :gutter="20">
        <el-col :span="12" :offset="5"
          ><div>
            <el-form-item label="姓名" prop="teacherName">
              <el-input v-model="ruleForm.teacherName"></el-input>
            </el-form-item></div></el-col
      ></el-row>
      <el-row :gutter='20'>
        <el-col :span='6' :offset='5'>
          <div>
            <el-form-item label='授课科目' prop='teacherJod'>
              <el-select v-model='ruleForm.teacherJod' @change="searchAvaliableclass()">
                <el-option label='chinese' value='chinese'></el-option>
                <el-option label='math' value='math'></el-option>
                <el-option label='english' value='english'></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12" :offset="5">
          <div>
            <el-form-item label='可选班级'>
              <el-input v-model="avaliableClass" disabled :title="avaliableClass"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12" :offset="5">
          <div>
            <el-form-item label="授课班级" prop="teachclass">
              <el-input v-model="ruleForm.teachclass" placeholder="从可选班级中选1~3个,多个班级间用逗号隔开"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="6" :offset="7"
          ><div class="grid-content bg-purple">
            <el-button type="success" @click="submitForm()" size="small"
              >立即提交</el-button
            >
          </div></el-col
        >
        <el-col :span="6" :offset="2"
          ><div class="grid-content bg-purple">
            <el-button @click="resetForm()" size="small">重置</el-button>
          </div></el-col
        >
      </el-row>
    </el-form>
  </div>
</template>
<script>
export default {
  props:['rows'],
  data() {
    // 自定义的验证规则
    let validatePass;
    
    validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"))
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass")
        }
        callback()
      }
    };
    let validatePass2;
    
    validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"))
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"))
      } else {
        callback()
      }
    };

    let validatePass4;

    validatePass4 = async (rule, value, callback) =>{
      //授课班级的限制
      if (value === '') {
        callback(new Error('请输入授课班级'));
      } else {
        // console.log(value);
        let skbjarray = value.split(","); //分割 即使加了最后一个也没关系

        let skbjsource = this.avaliableClass.split(","); //可选班级分割成数组

        skbjarray = [...new Set(skbjarray)];
        console.log(skbjarray);
        for(let i=0;i<skbjarray.length;i++){
          if(i>=3){
            break;
          }
          let flag = 1;

          //匹配班级号
          for(let j=0;j<skbjsource.length;j++){
            if(skbjsource[j]===skbjarray[i]){
              flag=0;
              break;
            }
          }
          if(flag){
            callback(new Error('请按照格式和给定的可选班级输入授课班级'));
          }      
        }
        callback();
      }
    }

    return {
      isdisabled: false,
      avaliableClass:'',
      ruleForm: {
        password: '',
        checkPass: '',
        userName: '',
        teacherName: '',
        kemu:'',
        teachclass:''
      },
      modifyId:'',
      rules: {
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' },
          { min: 6, max: 10, message: '长度应为6到10个字符', trigger: 'blur' },
          { pattern: /^[\S]*$/ ,message:'密码不能包含空格', trigger: 'blur' }
        ],
        checkPass: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { validator: validatePass2, trigger: "blur" }
        ],
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 8, message: '长度应为3到8个字符', trigger: 'blur' },
          { pattern: /^[a-zA_Z0-9]*$/ ,message:'用户名必须为数字或字母', trigger: 'blur' }
        ],

        teacherName: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 5, message: '长度应为2到5个汉字', trigger: 'blur' },
          { pattern:/^[\u4e00-\u9fa5]*$/,message:'姓名必须为中文', trigger: 'blur' }
        ],
        teachclass:[
          { required: true, message: '请输入授课班级', trigger: 'blur' },
          { validator: validatePass4, trigger: 'blur' }
        ],
        teacherJod:[
          { required: true, message: '请选择授课科目', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 提交修改老师信息请求
    submitForm() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          if(this.checkPass === this.password){
            let dataobj = this.ruleForm;

            // obj.id = rows[index].id;
            // obj.teacherJod = this.totalData[index].teacherJod;

            dataobj.classId = dataobj.teachclass.split(',');
            console.log(dataobj);
            let result = await this.$http({method: "POST",
              url: this.$http.defaults.baseURL+'updateTeacher',
              headers: {'Content-type': 'application/json;charset=UTF-8'},
              data: JSON.stringify(dataobj)
            });

            console.log(result);
            this.$router.push({ name: 'adminTeacher'})
            this.$message.success('修改成功')
            // console.log(this.ruleForm);
            // console.log(formName);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });      
    },
    // 重置表单
    resetForm() {     
      this.$confirm('此操作将重置你输入的内容, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$refs.ruleForm.resetFields();
        this.$message({
          type: 'success',
          message: '重置成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消重置'
        });
      });
    },
    // 暂无使用
    formatter(row, column) {
      return row.address
    },
    // 获取可选班级
    async searchAvaliableclass(){
      if(this.ruleForm.teacherJod===''){
        return;
      }

      if(this.ruleForm.teacherJod === this.oldJob){
        let obj = {'id':'', 'teacherJod':''};

        obj.id = parseInt(this.ruleForm.id, 10);
        obj.teacherJod = this.ruleForm.teacherJod;
        console.log(obj);

        let result = await this.$http({method: "POST",
          url: this.$http.defaults.baseURL+'queryClassIdForUpdate',
          headers: {'Content-type': 'application/json;charset=UTF-8'},
          data: JSON.stringify(obj)
        });

        if (result.status!==200) {
          return this.$message.error('获取可选班级信息失败！')
        }
        this.avaliableClass = result.data.join(",");
      }else if(this.ruleForm.teacherJod !== this.oldJob){

        let result = await this.$http.get('/queryClassIdForInsert/'+this.ruleForm.teacherJod);

        if (result.status!==200) {
          return this.$message.error('获取可选班级信息失败！')
        }
        this.avaliableClass = result.data.join(",");
      }
      


      // console.log(result);
    }
  },
  async created(){
    if(window.sessionStorage.getItem('rows')){
      this.ruleForm = JSON.parse(window.sessionStorage.getItem('rows'));
      this.ruleForm.password = '';
      this.oldJob = this.ruleForm.teacherJod;
      this.isdisabled=true;  
      // console.log(this.oldJob);  


      // 进来时候根据原来的科目获取可选班级 包含自己教的
      let obj = {'id':'', 'teacherJod':''};

      obj.id = parseInt(this.ruleForm.id, 10);
      obj.teacherJod = this.ruleForm.teacherJod;
      console.log(obj);

      let result = await this.$http({method: "POST",
        url: this.$http.defaults.baseURL+'queryClassIdForUpdate',
        headers: {'Content-type': 'application/json;charset=UTF-8'},
        data: JSON.stringify(obj)
      });

 
      this.avaliableClass = result.data.join(",")
    }
  }
}
</script>
<style >
h1 {
  color: rgb(22, 139, 104);
  align-content: center;
  font-size: 24px;
  margin-bottom: 10px;
}
</style>