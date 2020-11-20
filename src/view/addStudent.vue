<template>
  <div>
    <!-- 管理员添加学生页 -->
    <el-breadcrumb separator-class='el-icon-arrow-right'>
      <el-breadcrumb-item :to="{ path: '/adminwel' }">我的桌面</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/addstudent' }">添加学生</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      :model='ruleForm'
      status-icon
      :rules='rules'
      ref='ruleForm'
      label-width='100px'
      class='demo-ruleForm'>
      <el-row :gutter='20'>
        <el-col :span='12' :offset='5'>
          <div>
            <el-form-item :span='12' :offset='5' label='用户名' prop='userName'>
              <el-input v-model='ruleForm.userName'></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter='20'>
        <el-col :span='12' :offset='5'>
          <div>
            <el-form-item label='密码' prop='password'>
              <el-input
                type='password'
                v-model='ruleForm.password'
                autocomplete='off'></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter='20'>
        <el-col :span='12' :offset='5'>
          <div>
            <el-form-item label='确认密码' prop='checkPass'>
              <el-input
                type='password'
                v-model='ruleForm.checkPass'
                autocomplete='off'
              ></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter='20'>
        <el-col :span='12' :offset='5'>
          <div>
            <el-form-item label='班级' prop='studentClass'>
              <el-select v-model.number='ruleForm.studentClass'>
                <el-option label='170815' value='170815'></el-option>
                <el-option label='170814' value='170814'></el-option>
                <el-option label='170813' value='170813'></el-option>
                <el-option label='170812' value='170812'></el-option>
                <el-option label='170811' value='170811'></el-option>
                <el-option label='170810' value='170810'></el-option>
                <el-option label='170809' value='170809'></el-option>
                <el-option label='170808' value='170808'></el-option>
                <el-option label='170807' value='170807'></el-option>
                <el-option label='170806' value='170806'></el-option>
                <el-option label='170805' value='170805'></el-option>
                <el-option label='170804' value='170804'></el-option>
                <el-option label='170803' value='170803'></el-option>
                <el-option label='170802' value='170802'></el-option>
                <el-option label='170801' value='170801'></el-option
              ></el-select>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter='20'>
        <el-col :span='12' :offset='5'>
          <div>
            <el-form-item label='姓名' prop='studentName'>
              <el-input v-model='ruleForm.studentName'></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter='20'>
        <el-col :span='12' :offset='5'>
          <div>
            <el-form-item label='学号' prop='studentNumber'>
              <el-input v-model='ruleForm.studentNumber' ></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter='20'>
        <el-col :span='6' :offset='7'>
          <div class='grid-content bg-purple'>
            <el-button type='success' @click="submitForm('ruleForm')">立即提交</el-button>
          </div>
        </el-col>
        <el-col :span='6' :offset='2'>
          <div class='grid-content bg-purple'>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    // 表单验证规则
    let validatePass;

    validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    let validatePass2 ;

    validatePass2 = (rule, value, callback) => {
      if (value === '') {
        // console.log(validatePass2);
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    let validatePass3;

    validatePass3 = async (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else {
        // console.log(value);
        let result;

        result = await this.$http.get('getStudentsToAdmin');
        if (result.status!==200) {
          return this.$message.error('获取学生信息失败！')
        }
        this.totalData = result.data;
        let index;

        index = this.totalData.findIndex((stu)=>{
          return stu.userName === value;
        })
        if(index!==-1){
          callback(new Error('该用户名已存在'));
        }
        callback();
      }
    };
    let validatePass4;

    validatePass4 = async (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入学号'));
      } else {
        // console.log(value);
        let result;

        result = await this.$http.get('getStudentsToAdmin');
        if (result.status!==200) {
          return this.$message.error('获取学生信息失败！')
        }
        this.totalData = result.data;
        let index;

        index = this.totalData.findIndex((stu)=>{
          return stu.studentNumber === value;
        })
        if(index!==-1){
          callback(new Error('该学号已存在'));
        }
        callback();
      }
    };

    return {
      totalData: [],
      ruleForm: {
        password: '',
        checkPass: '',
        userName: '',
        studentName: '',
        studentClass: '',
        studentNumber: ''
      },
      rules: {
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' },
          { min: 6, max: 10, message: '长度应为6到10个字符', trigger: 'blur' },
          { pattern: /^[\S]*$/ ,message:'密码不能包含空格', trigger: 'blur' }
        ],
        checkPass: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ],
        userName: [
          { validator: validatePass3, trigger: 'blur' },
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 8, message: '长度应为3到8个字符', trigger: 'blur' },
          { pattern: /^[a-zA_Z0-9]*$/ ,message:'用户名必须为数字或字母', trigger: 'blur' }
        ],
        studentClass: [{ required: true, message: '请输入班级', trigger: 'blur' }],
        studentName: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 5, message: '长度应为2到5个汉字', trigger: 'blur' },
          { pattern:/^[\u4e00-\u9fa5]*$/,message:'姓名必须为中文', trigger: 'blur' }
        ],
        studentNumber: [
          { validator: validatePass4, trigger: 'blur' },
          { required: true, message: '请输入学号', trigger: 'blur' },
          { pattern: /^[0-9]*$/ ,message:'学号必须为数字', trigger: 'blur' },
          { len: 10, message: '学号长度必须为10个字符', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    // 重置表单
    resetForm(formName) {
      this.$confirm('此操作将重置你输入的内容, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$refs[formName].resetFields();
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
      return row.address;
    },
    // 提交添加学生
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$http({method: "POST",
            url: 'http://192.168.2.15:8081/test/insertStudent',
            headers: {'Content-type': 'application/json;charset=UTF-8'},
            data: JSON.stringify(this.ruleForm)});
          this.$router.push({ name: 'adminStudent', params: { id: '2' } })
          this.$message.success('添加成功');

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>
<style scoped>
</style>