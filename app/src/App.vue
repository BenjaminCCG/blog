<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  mounted(){
    window.onblur = function(){
      document.title = '记得回来哦~'
    }
  }
}
</script>
<style lang="scss">
@import "~@/assets/style/reset.scss";
</style>
