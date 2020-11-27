<template>
  <div class="article_container">
    <el-card v-for="item in list" :key="item.id">
      <div class="date">
        <p>{{new Date(item.create_time).getMonth()+1}}月</p>
        <span>{{String(new Date(item.create_time).getDate()).padStart(2,'0')}}</span>
      </div>
      <h2>{{item.title}}</h2>
      <p class="subtitle">
        <i class="fa fa-user"> 发表于</i>
        <i class="fa fa-clock"> {{item.create_time|formatDate}} • </i>
        <i class="fa fa-eye"> {{item.views}} 次围观 • </i>
        <i class="fa fa-comments"> 活捉 {{item.comment_num}} 条 </i>
        <!-- <i class="fa fa-heart"> 22点赞 • </i>
        <i class="fa fa-star"> 18收藏</i> -->
      </p>
      <div class="type_card" @click="$router.push('/classify/'+item.type)">{{type[item.type]}}</div>
      <section>
        <h3>{{item.desc}}</h3>
        <img :src="item.img" alt="">
      </section>
      <div class="btn_wrap">
        <el-button @click.native="$router.push('/article/'+item.id)">阅读全文</el-button>
      </div>
    </el-card>
    <div class="loadmore" v-if="hasNextPage" @click="loadMore">点击加载更多</div>
    <div v-else class="loadmore" style="cursor:auto">没有更多</div>
  </div>
</template>

<script>
import {dateFormat} from "@/utils/utils"
export default {
  props: {
    list: {
      type: Array,
      default: []
    },
    hasNextPage: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      type:{
        1:'技术分享',
        2:'生活杂谈'
      }
    }
  },
  filters:{
    formatDate(value){
      return dateFormat(value,'yyyy-MM-dd hh:mm')
    }
  },
  methods:{
    loadMore(){
      this.$emit('loadMore')
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  margin-bottom: 40px;
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
    cursor: pointer;
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
      line-height: 1.5em;
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
  cursor: pointer;
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
@media screen and (max-width:768px){
    .date{
      width: 50px;
      height:50px;
      padding: 0;
      left: -4px;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      span{
        font-size: 18px;
      }
    }
}
</style>