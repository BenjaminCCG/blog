<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  mounted(){
    let that = this;
    window.onblur = function(){
      document.title = '记得回来哦~'
    }
    window.onfocus = function(){
      document.title = that.$route.meta.title
    }
  }
}
</script>
<style lang="scss">
@import "~@/assets/style/reset.scss";
</style>
