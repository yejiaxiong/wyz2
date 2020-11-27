<template>
  <!-- 老师修改密码页面 -->
  <div class="luru_div">
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/teacher' }">我的桌面</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/changepwd' }">修改密码</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form :rules='rules' ref="form" :model="form" label-width="100px" id="myform">
      <el-form-item label="修改密码" prop='password'>
          <el-input v-model="form.password" placeholder="修改密码" style="width:300px" type="password"></el-input>
          <el-button style="background:#009688; color:#fff; float:right; margin-left:20px" @click="changepwd">提交</el-button>
      </el-form-item>
      
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    let validatePass;

    validatePass = (rule, value, callback) => {
      if (value === window.sessionStorage.getItem('password')) {
        callback(new Error('新密码不能与原密码相同'));
      }
      callback();
    };

    return {
      form: {
        password: '',
        id:''
      },
      rules: {
        password: [
          { validator: validatePass, trigger: 'blur' },
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 10, message: '长度应为6到10个字符', trigger: 'blur' },
          { pattern: /^[\S]*$/ ,message:'密码不能包含空格', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 修改老师自己的密码
    changepwd () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.form.id = window.sessionStorage.getItem('teacherid');
          let result;

          console.log(this.form);
          result =await this.$http({method: "POST",
            url: this.$http.defaults.baseURL+'updateTeacherPassword',
            headers: {'Content-type': 'application/json;charset=UTF-8'},
            data: JSON.stringify(this.form)
          });
          console.log(result);
          if(result.status===200){
            this.$message.success('修改成功');
            window.sessionStorage.setItem('activepath','/teacher');
            window.sessionStorage.setItem('password',this.form.password);
            this.$router.push({ name:'Teacher' });
          }      
        } else {
          this.$message.error('修改失败');
          return false;
        }
      });
    }
  }
}
</script>

<style scope>
.luru_div{
    position: relative;
    height: 100%;
}
#myform{
    position: absolute;
    top:50%;
    left: 40%;
    transform: translate(-50%,-50%);
}
</style>
