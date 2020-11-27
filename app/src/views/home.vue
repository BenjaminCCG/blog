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
        pageNum:1
      },
      list:[],
      hasNextPage:false
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
      this.form.pageNum++;
      this.getArtList()
    }
  },
  created(){
    this.getArtList()
  },
  components:{
    articleItem
  }
}
</script>

<style>
</style>