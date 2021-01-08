<template>
  <div>
    <el-card class="about">
      <h2>关于</h2>
      <section>
        <p>欢迎来到我的个人博客。我是Benjamin,一个95后菜鸟程序员，爱生活，爱美食。</p>
        <p>本站使用Vue+Node.Js完成前后端分离开发。</p>
        <p>有不足之处还请通知我哦~ <a href="mailto:32935650@qq.com">332935650@qq.com</a></p>
      </section>
      <img src="@/assets/image/maoto.png" class="timg" alt="">
    </el-card>
    <comment id="3" />
  </div>
</template>

<script>
import comment from "@/components/comment"
export default {
  components: {
    comment
  },
  methods:{
    socket(){
      let ws = new WebSocket('ws://localhost:7001')
      ws.onopen = function(evt) { 
  console.log("Connection open ..."); 
  ws.send("Hello WebSockets!");
};

    }
  },
  created(){
    this.socket()
  }
}
</script>

<style lang="scss" scoped>
h2 {
  font-size: 25px;
  font-weight: 700;
  text-align: center;
}
section {
  p {
    font-size: 14px;
    margin: 10px 0;
    line-height: 2em;
    a{
      font-style: italic;
      color: #01AAED;
    }
  }
}
.timg {
  max-width: 100%;
}
.about {
  margin-bottom: 20px;
}
</style>