<template>
  <div>
    <el-button type="primary" @click="$router.push('/user/edit')">添加用户</el-button>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="id">
      </el-table-column>
      <el-table-column prop="username" label="用户名">
      </el-table-column>
      <el-table-column prop="email" label="邮箱">
      </el-table-column>
      <el-table-column prop="phone" label="手机号码">
      </el-table-column>
       <el-table-column prop="introduce" label="介绍">
      </el-table-column>
      <el-table-column label="头像" align="center">
        <template slot-scope="scope"> 
          <img :src="scope.row.head" alt="" class="head">
        </template>
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
import {getUsers} from "@/api/user";
export default {
  name: 'User',
  data(){
    return {
      tableData:[]
    }
  },
  methods:{
    async getList(){
      let res = await getUsers();
      if(res.success){
        this.tableData = res.data
      }
    }
  },
  created(){
    this.getList();
  }
}
</script>

<style lang="scss" scoped>
.el-button{
  margin-bottom: 10px;
}
.head{
  width: 48px;
  height: 48px;
  border-radius: 50%;
}
</style>