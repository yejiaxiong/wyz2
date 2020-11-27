<template>
  <div class="box">
  <!-- 登陆页 -->
    <el-form ref="loginFormRef" :model="form" class="login_form">
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
        <el-button type="primary" @click="onSubmit" style="float:left; background:#009688">登录</el-button>
        <el-button @click="findPassword" style="float:right">找回密码</el-button>
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
        userName:'',
        password:'',
        type:'学生',
        typeid:''
      }
    }
  },
  methods: {
    // 登陆验证
    async onSubmit(){
      let result;

      // 获取后台数据
      result = await this.getLogin();
      console.log(result);
      if(result.url==="false"){
        this.$message.error('用户名或密码有误')
      }else{
        if(result.url==='Student'){
          window.sessionStorage.setItem('stuid',result.id);
          window.sessionStorage.setItem('password',this.form.password)
        }else if(result.url==='Admin'){
          window.sessionStorage.setItem('adminid',result.id);
        }else if(result.url==='Teacher'){
          window.sessionStorage.setItem('teacherid',result.id);
          //多存一个科目和班级号和密码
          window.sessionStorage.setItem('password',this.form.password)
          window.sessionStorage.setItem('classid',result.classId);
          window.sessionStorage.setItem('teacherjob',result.teacherJod);
        }
        this.$router.push({ name: result.url, params: {name:result.name,id:result.id} })
        window.sessionStorage.setItem('name',result.name)
      }
    },
    // 重置表单
    onReset(loginFormRef){
      this.$refs[loginFormRef].resetFields();
      this.form.type='学生';
    },
    // 将表单信息发送至后台获取登陆结果
    async getLogin(){
      let result;

      result =  await this.$http({method: "POST",
        url: this.$http.defaults.baseURL+'login',
        headers: {'Content-type': 'application/json;charset=UTF-8'},
        data: JSON.stringify(this.form)
      });
      return result.data;
    },
    // 找回密码
    findPassword(){
      this.$alert('请邮箱联系管理员guangming@qq.com', '找回密码', {
        confirmButtonText: '确定',
        callback: action => {
        }
      });
    }
  },
  // 从sessionStorage中移除一些东西
  created(){
    window.sessionStorage.removeItem('stuid');
    window.sessionStorage.removeItem('adminid');
    window.sessionStorage.removeItem('teacherid');
    window.sessionStorage.removeItem('currentId');
    window.sessionStorage.removeItem('activepath');
    window.sessionStorage.removeItem('classid');
  }
}
</script>
<style scope>
body{
  background:url('../assets/loginbg2.jpg') no-repeat center;
  background-size: 100% 100%;
  position: relative;
  width: 100%;
  height: 100%;
}
.box{
  width: 500px;
  height: 500px;
  background:transparent;
  padding: 20px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
.login_form{
  background: rgba(255,255,255,.6);
  text-align: center;
  position: absolute;
  padding: 30px;
  width: 500px;
  box-sizing: border-box;
  top: 10%;
  border-radius: 8%;
}
.el-radio__input.is-checked .el-radio__inner {
    border-color:#009688 !important;
    background:#009688 !important;
   
}
.el-radio__input.is-checked+.el-radio__label{
    color: black !important;
}
.el-form-item__label{
  font-size:17px !important;
}
.el-radio__label{
  font-size:17px !important;
}
 


</style>
