<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px" :inline="true">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="时间">
        <el-date-picker v-model="form.date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button>重置</el-button>
        <el-button type="primary" @click="$router.push('/article/edit')">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="id">
      </el-table-column>
      <el-table-column prop="title" label="标题">
      </el-table-column>
      <el-table-column prop="author" label="作者">
      </el-table-column>
      <el-table-column prop="created_at" label="创建时间">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small">删除</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from "@/api/article";
export default {
  name: 'Article',
  data() {
    return {
      tableData: [],
      form: {
        title: '',
        date: ''
      }
    }
  },
  methods: {
    async getArtList() {
      let res = await getList();
      if(res.success){
          this.tableData = res.data;
      }
    }
  },
  created() {
    this.getArtList()
  }
}
</script>

<style>
</style>