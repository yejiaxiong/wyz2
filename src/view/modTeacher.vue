<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">我的桌面</el-breadcrumb-item>
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
            <el-form-item label="用户名" prop="userNameT">
              <el-input v-model="ruleForm.userNameT"></el-input>
            </el-form-item></div></el-col
      ></el-row>
      <el-row :gutter="20">
        <el-col :span="12" :offset="5"
          ><div>
            <el-form-item label="密码" prop="passT">
              <el-input
                type="password"
                v-model="ruleForm.passT"
                autocomplete="off"
              ></el-input>
            </el-form-item></div></el-col
      ></el-row>
      <el-row :gutter="20">
        <el-col :span="12" :offset="5"
          ><div>
            <el-form-item label="确认密码" prop="checkPassT">
              <el-input
                type="password"
                v-model="ruleForm.checkPassT"
                autocomplete="off"
              ></el-input>
            </el-form-item></div></el-col
      ></el-row>
      <el-row :gutter="20">
        <el-col :span="12" :offset="5"
          ><div>
            <el-form-item label="姓名" prop="nameT">
              <el-input v-model="ruleForm.nameT"></el-input>
            </el-form-item></div></el-col
      ></el-row>

      <el-row :gutter="20">
        <el-col :span="6" :offset="7"
          ><div class="grid-content bg-purple">
            <el-button type="success" @click="submitForm('ruleForm')"
              >立即提交</el-button
            >
          </div></el-col
        >
        <el-col :span="6" :offset="2"
          ><div class="grid-content bg-purple">
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
      if (value === "") {
        callback(new Error("请输入密码"))
      } else {
        if (this.ruleForm.checkPassT !== "") {
          this.$refs.ruleForm.validateField("checkPassT")
        }
        callback()
      }
    };
    let validatePass2;
    
    validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"))
      } else if (value !== this.ruleForm.passT) {
        callback(new Error("两次输入密码不一致!"))
      } else {
        callback()
      }
    };
    return {
      ruleForm: {
        passT: '',
        checkPassT: '',
        userNameT: '',
        nameT: ''
      },
      rules: {
        passT: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { validator: validatePass, trigger: "blur" }
        ],
        checkPassT: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { validator: validatePass2, trigger: "blur" }
        ],
        userNameT: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 1, max: 8, message: "长度在 1 到 8个字符", trigger: "blur" }
        ],

        nameT: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5个字符", trigger: "blur" }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('修改成功')
          this.$router.push({ name: 'adminTeacher', params: { id: '4' } })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
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
      return row.address
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