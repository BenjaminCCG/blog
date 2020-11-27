<template>
  <div>
    <el-card class="appreciate">
      <h2>赞赏</h2>
      <img src="@/assets/image/timg.jpg" class="timg" alt="">
      <h3>赞赏说明</h3>
      <div class="description">
        <p>如果觉得本站还不错的话，欢迎赞赏支持，请我喝杯冰阔落吧 （*/∇＼*）</p>
      <p>如有任何疑问请在下面留言。</p>
      </div>
      <h3>赞赏方式</h3>
      <div class="qrcode">
        <div>
          <img src="@/assets/image/weixin.png" alt="">
          <p>微信扫一扫，向我赞赏</p>
        </div>
        <div>
          <img src="@/assets/image/zhifubao.png" alt="">
          <p>支付宝扫一扫，向我赞赏</p>
        </div>
      </div>
    </el-card>
    <comment id="1" />
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
h3{
  font-size: 25px;
  font-weight: 700;
  margin: 20px 0;
}
.timg{
  max-width: 100%;
}
.description{
  font-size: 16px;
  line-height: 2em;
  border-bottom: 1px solid #ccc;
}
.qrcode {
  display: flex;
  justify-content: center;
  div {
    margin: 20px;
    img {
      width: 150px;
      height: 150px;
    }
    p {
      font-size: 14px;
    }
  }
}
.appreciate{
  margin-bottom: 20px;
}
</style>