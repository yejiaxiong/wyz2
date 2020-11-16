<template>
  <div class="box">
  <!-- 登陆页 -->
    <el-form ref="loginFormRef" :model="form" class="login_form" >
    <h1>学生成绩管理系统</h1>
    <el-form-item label="用户名:" prop='username'>
      <el-input v-model="form.username"></el-input>
    </el-form-item>
    <el-form-item label="密码:" prop='password'>
      <el-input v-model="form.password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-radio-group v-model="form.type"  prop='type' id='radiocss'>
        <el-radio label="学生"   size="medium"></el-radio>
        <el-radio label="老师"  size="medium"></el-radio>
        <el-radio label="管理员" size="medium"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit" style="float:left; background:#009688">立即提交</el-button>
      <el-button @click="onReset('loginFormRef')" style="float:right">重置</el-button>
    </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form:{
        username:'Admin',
        password:'1234',
        type:'学生'
      }
    }
  },
  methods: {
    onSubmit(){
      // 登陆  用户名form.username 密码form.password
      // 根据用户类型请求后台数据库

      // 成功登陆 用token保存登陆状态 保存至浏览器的sessionStorage中

      // 登陆失败弹出提示框信息
    },
    onReset(loginFormRef){
      // 重置按钮
      console.log('重置');
      // this.$refs.loginFormRef.resetFields();
      this.$refs[loginFormRef].resetFields();
      console.log(this.form.type);
    }
  }
}
</script>
<style scope>
.box{
  width: 500px;
  height: 500px;
  background: #70db93;
  padding: 20px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
.login_form{
  background: #fff;
  text-align: center;
  position: absolute;
  padding: 30px;
  width: 500px;
  box-sizing: border-box;
  top: 10%;
}
.el-radio__input.is-checked .el-radio__inner {
    border-color:#009688 !important;
    background:#009688 !important;
}



</style>
