<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="简介">
        <el-input v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item label="分类">
        <el-radio-group v-model="form.type">
          <el-radio label="1">技术分享</el-radio>
          <el-radio label="2">生活杂谈</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="封面">
        <el-upload class="avatar-uploader" :action="uploadUrl" :show-file-list="false" :on-success="handleAvatarSuccess">
          <img v-if="form.img" :src="form.img" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="内容">
        <tinymce :height="300" v-model="form.content"></tinymce>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native="handleSubmit">发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import tinymce from "@/components/Tinymce/index";
import { addArticle,editArticle } from "@/api/article"
export default {
  name: 'Edit',
  data() {
    return {
      form: {
        title: '',
        type: '1',
        content: '',
        desc: '',
        img:''
      },
      isEdit:false,
      isDev:true,
      uploadUrl:''
    }
  },
  methods: {
    async handleSubmit() {
      let res = await (this.isEdit?editArticle(this.form):addArticle(this.form));
      if (res.success) {
        this.$message.success(this.isEdit?'修改成功':'添加成功');
        this.$router.go(-1)
      }
    },
    handleAvatarSuccess(res, file) {
      if (res.code == 200) {
        this.form.img = res.data.file
      }
    }
  },
  created(){
    this.uploadUrl = process.env.VUE_APP_BASE_API+'/article/saveavatar'
    this.isEdit = Object.keys(this.$route.query).length>0?true:false;
    if(this.isEdit){
      this.form.id = this.$route.query.id;
      Object.keys(this.form).forEach(key=>{
        this.form[key] = this.$route.query[key]
    })
    }
  },
  components: {
    tinymce
  }
}
</script>

<style lang="scss" scoped>
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