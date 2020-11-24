<template>
  <div class="article_container">
    <el-card v-for="i in 3" :key="i">
      <div class="date">
        <p>9月</p>
        <span>25</span>
      </div>
      <h2>这是一个标题</h2>
      <p class="subtitle">
        <i class="fa fa-user"> 发表于</i>
        <i class="fa fa-clock"> 2018年09月25日 • </i>
        <i class="fa fa-eye"> 3424 次围观 • </i>
        <i class="fa fa-comments"> 活捉 228 条  </i>
        <!-- <i class="fa fa-heart"> 22点赞 • </i>
        <i class="fa fa-star"> 18收藏</i> -->
      </p>
      <div class="type_card">生活杂谈</div>
      <section>
        <h3>这是文章的简介</h3>
        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606153701461&di=83b39859874e161ec57f5808810a3ccd&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fdc2a609fb6e9e014c1c751c299ee6022f8dc54575f1c-eqMy90_fw658" alt="">
      </section>
      <div class="btn_wrap">
        <el-button  @click.native="$router.push('/article/2')">阅读全文</el-button>
      </div>
    </el-card>
    <div class="loadmore">点击加载更多</div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.el-card {
  margin-bottom:40px;
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
  section {
    margin-top: 60px;
    h3 {
      text-indent: 2em;
      margin-bottom: 15px;
    }
    img {
      width: 100%;
    }
  }
  .btn_wrap {
    text-align: center;
    .el-button {
      background: #97dffd;
      color: #fff;
      padding: 5px 10px;
      margin-top: 10px;
    }
  }
}
.loadmore {
  border-radius: 5px;
  text-align: center;
  font-size: 14px;
  color: #fff;
  height: 30px;
  line-height: 30px;
  background: #97dffd;
}
.date {
  position: absolute;
//   top: -20px;
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
</style>