<template>
  <div>
    <el-card class="board">
      <h2>留言</h2>
      <p>有什么想对我说的就给我留言吧~</p>
      <img src="@/assets/image/timg.jpg" class="timg" alt="">
    </el-card>
    <comment id="2" />
  </div>
</template>

<script>
import comment from "@/components/comment"
export default {
  components:{
    comment
  }
}
</script>

<style lang="scss" scoped>
h2 {
  font-size: 25px;
  font-weight: 700;
  text-align: center;
}
p{
  font-weight: bold;
  font-size: 16px;
  margin: 10px 0;
}
.timg{
  max-width: 100%;
}
.board{
  margin-bottom: 20px;
}
</style>