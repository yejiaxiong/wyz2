<template>
<!-- 学生修改密码组件 -->
  <div class="luru_div">
  <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">我的桌面</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/changepwd2' }">修改密码</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表单区域 -->
    <el-form ref="form" :model="form" label-width="80px" id="myform2">
      <el-form-item label="修改密码">
           <el-input v-model="form.newPassword" placeholder="修改密码" style="width:500px"></el-input>
      </el-form-item>
      <!-- 提交修改新密码 -->
      <el-button style="background:#009688; color:#fff; float:right; margin-right:20px" @click="changepwd2">提交</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        newPassword: ''
      }
    }
  },
  methods: {
    changepwd2 () {
      console.log(this.form.newPassword)

      // this.form.newPassword进行校验

      // this.form.newPassword校验成功提示学生用户更新成功，并重置字段为空

      // this.form.newPassword校验失败提示用户密码不符合规范等
    }
  }
}
</script>

<style scope>
.luru_div{
    position: relative;
    height: 100%;
}
#myform2{
    position: absolute;
    top:50%;
    padding: 0 300px;
}
</style>
