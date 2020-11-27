<template>
  <div class="layout">
      <nav-header></nav-header>
      <div class="container">
          <el-row :gutter="30">
              <el-col :sm="24" :md="16">
                  <router-view></router-view>
              </el-col>
              <el-col :sm="24" :md="8">
                  <right-slider></right-slider>
              </el-col>
          </el-row>
      </div>
      <my-footer></my-footer>
  </div>
</template>

<script>
import navHeader from "@/components/navHeader";
import rightSlider from "@/components/rightSlider";
import myFooter from "@/components/myFooter"
export default {
  data() {
    return {

    }
  },
  components:{
      navHeader,
      rightSlider,
      myFooter
  }
}
</script>

<style scoped lang="scss">
.layout{
    background: rgb(239,239,239);
}
.container{
    width: 80%;
    margin: 0 auto;
    margin-top: 80px;
}
@media screen and (max-width:768px){
     .container{
         width: 90%;
         margin-top: 20px;
     }
}
</style>