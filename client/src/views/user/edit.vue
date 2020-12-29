<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="介绍">
        <el-input v-model="form.introduce"></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <el-upload class="avatar-uploader" :action="uploadUrl" :show-file-list="false" :on-success="handleAvatarSuccess">
          <img v-if="form.head" :src="form.head" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native="handleSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {register} from "@/api/user"
export default {
  name: 'UserEdit',
  data() {
    return {
      form: {
        username: '',
        password: '',
        email: '',
        phone: '',
        introduce: '',
        head: ''
      },
      uploadUrl:''
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      if (res.code == 200) {
        this.form.head = res.data.file
      }
    },
    async handleSubmit(){
      let res = await register(this.form);
      if(res.success){
        this.$message.success('添加用户成功');
        this.$router.go(-1)
      }
    },
  },
  created(){
    this.uploadUrl = process.env.VUE_APP_BASE_API+'/article/saveavatar'
  }
}
</script>

<style scoped lang="scss">
.el-form {
  width: 80%;
  margin: 0 auto;
}
.avatar-uploader .el-upload {
  width: 178px;
  height: 178px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed #d9d9d9;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>