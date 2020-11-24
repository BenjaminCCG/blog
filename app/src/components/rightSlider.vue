<template>
  <div>
    <el-card>
      <img src="@/assets/image/headright.jpg" alt="" class="junming">
      <div class="tool_container">
        <el-tooltip class="item" effect="dark" content="Github" placement="top">
          <i class="fa fa-github" @click="toUrl('https://github.com/BenjaminCCG')"></i>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="QQ" placement="top">
          
            <a href="http://ccodecloud.xyz/static/qq.jpg" target="_blank"><i class="fa fa-qq"></i></a>
          
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="微博" placement="top">
          <i class="fa fa-weibo" @click="toUrl('https://weibo.com/5903523496/profile?rightmod=1&wvr=6&mod=personinfo&is_all=1')"></i>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="微信" placement="top">
          <a href="http://ccodecloud.xyz/static/weixin2.jpg" target="_blank"><i class="fa fa-weixin"></i></a>
        </el-tooltip>
      </div>
    </el-card>
    <el-card>
      <span class="like">Do you like me?</span>
      <p>
        <i :class="isLike?'heart active':'heart'" @click="handleLike"></i>
        <span>{{likeNum}}</span>
      </p>
    </el-card>
    <el-card>
      <ul class="title_list">
        <li v-for="i in 6" :key="i">
          <span>这是一个标题</span>
          ——
          <span> 3430 次围观</span>
        </li>
      </ul>
    </el-card>
    <div :class="gotoTop?'toTop':'toTop goTop'" @click="toTopfun">
      <img src="@/assets/image/long.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLike: false,
      likeNum: 0,
      gotoTop: false,
      going: false
    }
  },
  mounted() {
    let that = this;
    window.onscroll = function () {
      var t = document.documentElement.scrollTop || document.body.scrollTop;
      if (!that.going) {
        if (t > 600) {
          that.gotoTop = true;
        } else {
          that.gotoTop = false;
        }
      }

    }


  },
  methods: {
    handleLike() {
      if (!this.isLike) {
        this.likeNum++
      }
      this.isLike = true;
      let timer = setTimeout(() => {
        this.isLike = false;
        clearTimeout(timer)
      }, 1000)
    },
    toTopfun(e) {
      var that = this;
      this.gotoTop = false;
      this.going = true;
      var timer = setInterval(function () {
        //获取滚动条距离顶部高度
        var osTop = document.documentElement.scrollTop || document.body.scrollTop;
        var ispeed = Math.floor(-osTop / 7);
        document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;
        //到达顶部，清除定时器
        if (osTop == 0) {
          that.going = false;
          clearInterval(timer);
          timer = null;
        };
      }, 30);
    },
    toUrl(url){
      window.open(url,'_blank')
    }
  }
}
</script>

<style scoped lang="scss">
.el-card:hover {
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}
.el-card {
  margin-bottom: 20px;
  transition: all 0.5s ease;
  .junming {
    width: 100%;
    min-height: 100px;
  }
  .tool_container {
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
    i {
      display: inline-block;
      width: 42px;
      height: 42px;
      text-align: center;
      line-height: 42px;
      background: rgba(0, 0, 0, 0.1);
      color: rgba(0, 0, 0, 0.5);
      font-size: 18px;
      border-radius: 50%;
      cursor: pointer;
    }
  }
  &:nth-child(2) {
    text-align: center;
    color: #df2050;
    .like {
      font-size: 20px;
    }
    p {
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        font-size: 40px;
        margin-left: -20px;
      }
      i {
        display: inline-block;
        width: 100px;
        height: 100px;
        background: url("../assets/image/heart.png");
        background-position: 0 0;
        transition: background-position 1s steps(28);
        transition-duration: 0s;
        cursor: pointer;
      }
      .active {
        transition-duration: 1s;
        background-position: -2800px 0;
      }
    }
  }
}
.toTop {
  position: fixed;
  right: 40px;
  top: -150px;
  z-index: 99;
  width: 70px;
  height: 900px;
  transition: all 0.5s 0.3s ease-in-out;
  cursor: pointer;
}
.goTop {
  top: -950px;
}
.title_list{
  font-size: 14px;
  li{
    margin: 15px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    &>span:first-child{
    font-weight: bold;
    cursor: pointer;
  }
  }
}
</style>