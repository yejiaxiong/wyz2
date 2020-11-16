<template>
  <div class="luru_div">
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">我的桌面</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/changepwd' }">修改密码</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="form" :model="form" label-width="80px" id="myform">
      <el-form-item label="修改密码">
           <el-input v-model="form.new_password" placeholder="修改密码" style="width:500px"></el-input>
      </el-form-item>
      <el-button style="background:#009688; color:#fff; float:right; margin-right:20px" @click="changepwd">提交</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        newpassword: ''
      }
    }
  },
  methods: {
    changepwd () {
      console.log('修改密码')
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
    padding: 0 300px;
}
</style>
