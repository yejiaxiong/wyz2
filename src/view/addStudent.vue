<template>
  <div>
    <el-breadcrumb separator-class='el-icon-arrow-right'>
      <el-breadcrumb-item :to="{ path: '/admin' }">我的桌面</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/addstudent' }"
        >添加学生</el-breadcrumb-item
      >
    </el-breadcrumb>

    <el-form
      :model='ruleForm'
      status-icon
      :rules='rules'
      ref='ruleForm'
      label-width='100px'
      class='demo-ruleForm'
    >
      <el-row :gutter='20'>
        <el-col :span='12' :offset='5'
          ><div>
            <el-form-item :span='12' :offset='5' label='用户名' prop='userName'>
              <el-input v-model='ruleForm.userName'></el-input>
            </el-form-item></div></el-col
      ></el-row>
      <el-row :gutter='20'>
        <el-col :span='12' :offset='5'
          ><div>
            <el-form-item label='密码' prop='pass'>
              <el-input
                type='password'
                v-model='ruleForm.pass'
                autocomplete='off'
              ></el-input>
            </el-form-item></div></el-col
      ></el-row>
      <el-row :gutter='20'>
        <el-col :span='12' :offset='5'
          ><div>
            <el-form-item label='确认密码' prop='checkPass'>
              <el-input
                type='password'
                v-model='ruleForm.checkPass'
                autocomplete='off'
              ></el-input>
            </el-form-item></div></el-col
      ></el-row>
      <el-row :gutter='20'>
        <el-col :span='12' :offset='5'
          ><div>
            <el-form-item label='班级' prop='classNum'>
              <el-select v-model.number='ruleForm.classNum'>
                <el-option label='170815' value='shanghai'></el-option>
                <el-option label='170813' value='beijing'></el-option>
                <el-option label='170814' value='c1'></el-option>
                <el-option label='170812' value='c2'></el-option
              ></el-select>
            </el-form-item></div></el-col
      ></el-row>
      <el-row :gutter='20'>
        <el-col :span='12' :offset='5'
          ><div>
            <el-form-item label='姓名' prop='name'>
              <el-input v-model='ruleForm.name'></el-input>
            </el-form-item></div></el-col
      ></el-row>
      <el-row :gutter='20'>
        <el-col :span='12' :offset='5'
          ><div>
            <el-form-item label='学号' prop='num'>
              <el-input v-model.number='ruleForm.num'></el-input>
            </el-form-item></div></el-col
      ></el-row>
      <el-row :gutter='20'>
        <el-col :span='6' :offset='7'
          ><div class='grid-content bg-purple'>
            <el-button type='success' @click="submitForm('ruleForm')">立即提交</el-button>
          </div></el-col
        >
        <el-col :span='6' :offset='2'
          ><div class='grid-content bg-purple'>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </div></el-col
        >
      </el-row>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
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
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: '',
        checkPass: '',
        userName: '',
        classNum: '',
        name: '',
        num: ''
      },
      rules: {
        pass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 8, message: '长度在 1 到 8个字符', trigger: 'blur' }
        ],
        classNum: [{ required: true, message: '请输入班级', trigger: 'blur' }],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5个字符', trigger: 'blur' }
        ],
        num: [{ required: true, message: '请输入学号', trigger: 'blur' }]
      }
    };
  },
  methods: {
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
  
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('添加成功');
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