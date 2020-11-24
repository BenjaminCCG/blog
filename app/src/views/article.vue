<template>
  <div class="article_container">
    <el-card>
      <div class="date">
        <p>9月</p>
        <span>25</span>
      </div>
      <h2>这是一个标题</h2>
      <p class="subtitle">
        <i class="fa fa-user"> 发表于</i>
        <i class="fa fa-clock"> 2018年09月25日 • </i>
        <i class="fa fa-eye"> 3424 次围观 • </i>
        <i class="fa fa-comments"> 活捉 228 条 </i>
        <!-- <i class="fa fa-heart"> 22点赞 • </i>
        <i class="fa fa-star"> 18收藏</i> -->
      </p>
      <div class="type_card">生活杂谈</div>
      <section></section>
      <div class="btn_wrap">
        <el-button type="danger" @click="showCode = !showCode">赞赏</el-button>
      </div>
      <div class="qrcode" v-show="showCode">
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
    <comment />
  </div>
</template>

<script>
import comment from "@/components/comment"
export default {
  data() {
    return {
      showCode:false
    }
  },
  components:{
    comment
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  margin-bottom: 40px;
  section {
    margin-top: 60px;
  }
  .btn_wrap {
    text-align: center;
    .el-button {
      padding: 6px 20px;
    }
  }
  h2,
  .subtitle {
    text-align: center;
  }
  h2 {
    font-size: 25px;
    font-weight: bold;
    margin: 10px 0;
  }
  .subtitle {
    font-size: 14px;
    i {
      margin: 0 2px;
    }
  }
  .type_card {
    margin: 5px 0 15px 2px;
    color: #fff;
    background: #97dffd;
    border-radius: 0 4px 4px 0;
    padding: 7px 11.2px 7px 32px;
    display: inline-block;
    font-size: 14px;
    position: absolute;
    left: 0;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
      0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    &::after {
      position: absolute;
      content: "";
      top: 100%;
      left: 0;
      border-top: 0 solid transparent;
      border-right-width: 1em;
      border-right-color: #48456d;
      border-right-style: solid;
      border-bottom: 1em solid transparent;
      border-left: 0 solid transparent;
      width: 0;
      height: 0;
    }
  }
}
.date {
  position: absolute;
  left: -25px;
  height: 60px;
  width: 70px;
  padding-top: 10px;
  border-radius: 100px;
  color: #fff;
  background: #97dffd;
  text-align: center;
  margin-top: -50px;
  span {
    font-size: 40px;
    font-weight: bold;
  }
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
</style>