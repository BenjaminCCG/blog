<template>
  <div>
    <articleItem :list='list' :hasNextPage='hasNextPage' @loadMore="loadMore" />
  </div>
</template>

<script>
import articleItem from '@/components/articleItem';
import {getArticleList} from '@/api'
export default {
  data() {
    return {
      form:{
        pageSize:5,
        pageNum:1,
        type:''
      },
      list:[],
      hasNextPage:false
    }
  },
  watch:{
    '$route.params.type':{
      handler(value){
        this.form.type = value;
        this.getArtList()
      },
      immediate:true
    }
  },
  methods:{
    async getArtList(){
      let res = await getArticleList(this.form);
      if(res.success){
        this.list = this.form.pageNum==1?res.body.list:this.list.concat(res.body.list);
        this.hasNextPage = res.body.hasNextPage
      }
    },
     loadMore(){
      this.pageNum++;
      this.getArtList()
    }
  },
  components:{
    articleItem
  }
}
</script>

<style>
</style>