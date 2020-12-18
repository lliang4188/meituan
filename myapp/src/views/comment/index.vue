<template>
    <div>
        <score :delivery="comment.delivery" :flavor="comment.flavor" :score="comment.score" :packing="comment.packing" ></score>
        <div class="tag-container">
            <tag :tag="comment.label" :currentType="type"></tag>
        </div>
        <list :list="comment.rate"></list>
    </div>
</template>

<script>
  import score from "./score";
  import tag from "./tag";
  import list from "./list";
  import {getComment} from "../../../api/comment";

  export default {
    data(){
      return{
          type: 1, // 全部
          comment:{}
      }
    },
    components:{
      score,
      tag,
      list
    },
    methods:{
        getData(){
            getComment({
                id:this.$route.query.id,
                type:this.type
            }).then(res=>{
                console.log(res.data)
                this.comment = res.data;
            })
        }
    },
    created() {
        this.getData()
    }
  }
</script>

<style lang="scss" scoped>
    .tag-container{
        border-top: 0.2rem solid #f4f4f4;
    }
</style>
