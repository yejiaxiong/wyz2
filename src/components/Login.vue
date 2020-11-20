<template>
  <div class="box">
  <!-- 登陆页 -->
    <el-form ref="loginFormRef" :model="form" class="login_form" >
      <h1>学生成绩管理系统</h1>
      <el-form-item label="用户名:" prop='userName'>
        <el-input v-model="form.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码:" prop='password'>
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-radio-group v-model="form.type"  prop='type' id='radiocss'>
          <el-radio label="学生"   size="medium" ></el-radio>
          <el-radio label="老师"   size="medium"></el-radio>
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
      typearr:['管理员','老师','学生'],
      form:{
        userName:'guangm',
        password:'666666',
        type:'管理员',
        typeid:''
      }
    }
  },
  methods: {
    // 登陆验证
    async onSubmit(){
      let result;

      result = await this.getLogin();
      console.log(result);
      if(result.url==="false"){
        this.$message.error('用户名或密码有误')
      }else{
        if(result.url==='Student'){
          window.sessionStorage.setItem('stuid',result.id);
        }else if(result.url==='Admin'){
          window.sessionStorage.setItem('adminid',result.id);
        }else if(result.url==='Teacher'){
          window.sessionStorage.setItem('teacherid',result.id);
        }
        this.$router.push({ name: result.url, params: {name:result.name,id:result.id} })
        window.sessionStorage.setItem('name',result.name)
      }
      // 登陆  用户名form.username 密码form.password
      // 根据用户类型请求后台数据库

      // 成功登陆 用token保存登陆状态 保存至浏览器的sessionStorage中

      // 登陆失败弹出提示框信息
    },
    // 重置
    onReset(loginFormRef){
      // 重置按钮
      console.log('重置');
      // this.$refs.loginFormRef.resetFields();
      this.$refs[loginFormRef].resetFields();
      this.form.type='学生';
      console.log(this.form.type);
    },
    // 登陆获取
    async getLogin(){
      let result;

      result =  await this.$http({method: "POST",
        url: 'http://192.168.2.15:8081/test/login',
        headers: {'Content-type': 'application/json;charset=UTF-8'},
        data: JSON.stringify(this.form)
      });
      return result.data;
    }
  },
  created(){
    window.sessionStorage.removeItem('stuid');
    window.sessionStorage.removeItem('adminid');
    window.sessionStorage.removeItem('teacherid');
    window.sessionStorage.removeItem('currentId');
    window.sessionStorage.removeItem('activepath');
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
.el-radio__input.is-checked+.el-radio__label{
    color: black !important;
}



</style>
