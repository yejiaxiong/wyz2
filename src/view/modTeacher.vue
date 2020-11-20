<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin' }">我的桌面</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/addteacher' }"
        >管理老师</el-breadcrumb-item
      >
    </el-breadcrumb>
    <el-row :gutter="20">
      <el-col :span="11" :offset="9"
        ><div>
          <h1>修改老师信息</h1>
        </div></el-col
      ></el-row
    ><br><br>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
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

      <el-row :gutter="20">
        <el-col :span="6" :offset="7"
          ><div class="grid-content bg-purple">
            <el-button type="success" @click="submitForm(ruleForm)"
              >立即提交</el-button
            >
          </div></el-col
        >
        <el-col :span="6" :offset="2"
          ><div class="grid-content bg-purple">
            <el-button @click="resetForm()">重置</el-button>
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
    return {
      isdisabled: false,
      ruleForm: {
        password: '',
        checkPass: '',
        userName: '',
        teacherName: ''
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
        ]
      }
    }
  },
  methods: {
    // 提交修改
    submitForm(formName) {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if(this.checkPass === this.password){
            this.$http({method: "POST",
              url: 'http://192.168.2.15:8081/test/updateTeacher',
              headers: {'Content-type': 'application/json;charset=UTF-8'},
              data: JSON.stringify(formName)
            });
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
    formatter(row, column) {
      return row.address
    }
  },
  created(){
    if(window.sessionStorage.getItem('rows')){
      this.ruleForm = JSON.parse(window.sessionStorage.getItem('rows'));
      this.ruleForm.password = '';
      this.isdisabled=true;     
    }
  }
}
</script>
<style >
h1 {
  color: rgb(22, 139, 104);
  align-content: center;
  font-size: 40px;
}
</style>